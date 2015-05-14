/**
 * Coverts a Date object to a input[type='date'] value
 * @type {Function}
 * @return formatted value
 */
Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});

Meteor.startup(function () {

    // Add rendered functions to all templates
    for (var property in Template) {
        if (Blaze.isTemplate(Template[property])) {
            var template = Template[property];

            // Add rendered callback
            template.onRendered(function () {

                // Loop through all variables we want to bind
                var elements = $('[data-binding]');
                elements.each(function () {
                    var $this = $(this);

                    // Trigger all callbacks to synchronize values
                    $this
                        .trigger('input')
                        .trigger('change')
                        .trigger('drag');
                });

                // If our bound Session variable changes, update the corresponding element in the DOM
                Tracker.autorun(function () {
                    elements.each(function () {
                        var variable = $(this).data('binding');
                        var value = Session.get(variable);
                        var type = $(this).prop('type');

                        // Format date object to match input[type='date'] format
                        if (value instanceof Date) {
                            value = (new Date).toDateInputValue();
                        }

                        if (type === 'checkbox' || type === 'radio') {

                            // Find all matching DOM elements
                            var selector = '[data-binding=\'' + variable + '\']';
                            var elements = $(selector);

                            if (value !== undefined) {

                                // Ensure we have an array to loop over
                                if (!_.isArray(value)) {
                                    value = new Array(value);
                                }

                                // Add checked property to all truthy values
                                elements.each(function () {
                                    $(this).prop('checked', false);
                                });
                                value.forEach(function (name) {
                                    $(selector + '[value=\'' + name + '\']').prop('checked', true);
                                });
                            }
                        } else {

                            // In this case we copy the Session variable to the value property
                            $($('[data-binding=\'' + variable + '\']')).val(value);
                        }
                    });
                });
            });

            // Add event handlers
            template.events = {

                // Drag event for input[type='range'] IE support
                'input, change, drag [data-binding]': function (e) {
                    var $target = $(e.target);
                    var variable = $target.data('binding');
                    var value = $target.val();
                    var prevValue = Session.get(variable);
                    var type = $target.prop('type');

                    // Update the Session variable depending on the type of input element
                    switch (type) {
                        case 'checkbox':
                            var checked = $target.is(':checked');

                            if (prevValue) {

                                // Create an array to generalize processing
                                if(!_.isArray(prevValue)) {
                                    prevValue = [prevValue];
                                }

                                if (checked) {

                                    // Add the newly checked element to the array
                                    if (!_.contains(prevValue, value)) {
                                        prevValue.push(value);
                                    } else {
                                        return;
                                    }
                                } else {

                                    // Remove the unchecked element from the array
                                    var index = prevValue.indexOf(value);
                                    if(index > -1) {
                                        prevValue.splice(index, 1);
                                    }
                                }
                                value = prevValue;
                            } else if (!checked) {
                                value = undefined;
                            }

                            // Format array
                            if(_.size(value) === 0) {
                                value = undefined;
                            }
                            if(_.size(value) === 1) {
                                value = value[0];
                            }
                            break;
                        case 'radio':
                            value = $target.is(':checked') ? value : undefined;
                            break;
                        case 'range': // Fall through
                        case 'number':
                            var intValue = parseInt(value);
                           value = isNaN(intValue) ? undefined : intValue;
                            break;
                        case 'date': // Fall through
                        case 'datetime':
                            value = value ? new Date(value) : undefined;
                    }

                    // Update the Session object with the computed value
                    Session.set(variable, value);
                }
            }
        }
    }
});
