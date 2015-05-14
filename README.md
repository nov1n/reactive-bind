# reactive-bind

Two way data binding for HTML input elements. No setup required.

Click [here](http://reactive-bind-demo.meteor.com) for a demo.

## Installation
```
meteor add nov1n:reactive-bind
```

## Usage
Add data-binding='foo' to an input element to bind it to a Session variable named 'foo'.

## Example
```HTML
<input type='text' data-binding='exampleVariable'/>
```

Binds the Session variable 'exampleVariable' to the input element in the DOM. Any changes to the text field will be reflected
by the Session variable and vice versa.

## Supported elements
### Text
```HTML
<input type='text' data-binding='exampleVariable2'/>
```

The value stored in the Session variable is the text as String.

### Password
```HTML
<input type='password' data-binding='exampleVariable3'/>
```

The value stored in the Session variable is the text as String.

### Number
```HTML
<input type='number' data-binding='exampleVariable4'/>
```

The value stored in the Session variable is number as Number.

### Textarea
```HTML
<textarea name='area' data-binding='exampleVariable5'></textarea>
```

The value stored in the Session variable is the text as tring.

### Radio button(s)
```HTML
<input type='radio' name='color' value='Red' data-binding='exampleVariable6'/> Red
<input type='radio' name='color' value='Blue' data-binding='exampleVariable6'/> Blue
<input type='radio' name='color' value='Green' data-binding='exampleVariable6'/> Green
```

The value stored in the Session variable is the value as String.

### Date
```HTML
<input type='date' data-binding='exampleVariable7'/>
```

The value stored in the Session variable is a Date object.

### Checkbox(es)
```HTML
<input type='checkbox' name='vehicle' value='Bike' data-binding='exampleVariable8'/> Bike
<input type='checkbox' name='vehicle' value='Car' data-binding='exampleVariable8'/> Car
<input type='checkbox' name='vehicle' value='Plane' data-binding='exampleVariable8'/> Plane
```

The value stored in the Session variable is the value as String. When more than one checkbox
is checked, it becomes an array of Strings.

### Range
```HTML
<input type='range' data-binding='exampleVariable9'/>
```

The value stored in the Session variable is the text as Number.

### Color picker
```HTML
<input type='color' data-binding='exampleVariable10'/>
```

The value stored in the Session variable is the color as hex triplet String (e.g. '#FFFFFF').

## License
The code is licensed under the MIT License (see LICENSE file).

