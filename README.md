# Range Slider 
### a very minimal range slider api
```javascript
const rs = new RangeSlider(/*css selector -> #slideElement*/, /*css selector -> #rangeElement*/);

rs.slide(
  prop => {
    // prop is an object that exposes the amount of pixels the slide handle has moved
    // and the percent of the range it has moved
    console.log(prop);
  };
);
```
