
// set focus to the first input field
var inputField=document.getElementById('existing-rgp-base-curve');
inputField.focus();
inputField.select();

// add event listeners to the input fields to calculate the result when the user changes the value.
// also add a listener to select the text when the user clicks on the input field
var input1 = document.getElementById('existing-rgp-base-curve');
input1.addEventListener('input', calculate);
input1.addEventListener('change', calculate);
input1.addEventListener('focus', function() {
  input1.select();
});

var input2 = document.getElementById('existing-rgp-power');
input2.addEventListener('input', calculate);
input2.addEventListener('change', calculate);
input2.addEventListener('focus', function() {
  input2.select();
});

var input3 = document.getElementById('over-refraction');
input3.addEventListener('input', calculate);
input3.addEventListener('change', calculate);
input3.addEventListener('focus', function() {
  input3.select();
});

var input4 = document.getElementById('new-rgp-base-curve');
input4.addEventListener('input', calculate);
input4.addEventListener('change', calculate);
input4.addEventListener('focus', function() {
  input4.select();
});

var input5 = document.getElementById('vertex-distance');
input5.addEventListener('input', calculate);
input5.addEventListener('change', calculate);
input5.addEventListener('focus', function() {
  input5.select();
});

function calculate() {
  /* get the elements and check for validity; if all valid, calculate result else display an error */

  /* get the values from the input fields */
  const existingbase = document.getElementById('existing-rgp-base-curve');
  /* check if all fields are filled */
  /* first the base curve */
  if (existingbase.checkValidity()) {
    /* now the power */
    const existingpower = document.getElementById('existing-rgp-power');
    if (existingpower.checkValidity()) {
      /* now the overrefraction */
      const overrefraction = document.getElementById('over-refraction');
      if (overrefraction.checkValidity()) {
        const vertexdistance = document.getElementById('vertex-distance');
        if (vertexdistance.checkValidity()) {
          /* now the new base curve */
          const newbase = document.getElementById('new-rgp-base-curve');
          if (newbase.checkValidity()) {
            /* all fields are valid, so calculate the result */
            /* convert the values to numbers */
            let existingBaseValue;
            let existingPowerValue;
            let overRefractionValue;
            let newBaseValue;
            let vertexDistanceValue;

            existingBaseValue = parseFloat(existingbase.value);
            existingPowerValue = parseFloat(existingpower.value);
            overRefractionValue = parseFloat(overrefraction.value);
            newBaseValue = parseFloat(newbase.value);
            vertexDistanceValue = parseFloat(vertexdistance.value);

            /* calculate the result */
            // first, calculate the ocular refraction
            const ocularRefraction = overRefractionValue/(1 - vertexDistanceValue / 1000 * overRefractionValue);

            const refractiveIndexTears = 1.336;
            const frontSurfaceTearPowerExisting = (refractiveIndexTears - 1) * 1000 / existingBaseValue;
            const frontSurfaceTearPowerNew = (refractiveIndexTears - 1) * 1000 / newBaseValue;
            const changeInFrontSurfaceTearPower = frontSurfaceTearPowerNew - frontSurfaceTearPowerExisting;
            const newPowerValue = Math.round( (-1 * changeInFrontSurfaceTearPower + ocularRefraction + existingPowerValue) * 100) / 100;
            console.log(newPowerValue);
            const formatter = new Intl.NumberFormat('en-AU', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              signDisplay: 'always',
            });
            const formattedNumber = formatter.format(newPowerValue);
            /* display the result */
            document.getElementById('result').innerHTML = 'The new power will be ' + formattedNumber + ' D';
          } else {
            document.getElementById('result').innerHTML = 'Your new base curve is not valid';
          }
        } else {
          document.getElementById('result').innerHTML = 'Your vertex distance is not valid';
        }
      } else {
        document.getElementById('result').innerHTML = 'Your over-refraction is not valid';
      }
    } else {
      document.getElementById('result').innerHTML = 'Your existing power is not valid';
    }
  } else {
    document.getElementById('result').innerHTML = 'Your existing base curve is not valid';
  }
};
