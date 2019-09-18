import React from 'react';
import {
  Typography,
} from '@material-ui/core';

const Home = () => (
  <div>
    <Typography variant="display1">Home</Typography>

    <br>
    </br>

    <h4>
      This app was developed to help bridge the gap between family members and the medical needs and knowledge of family history that everyone should know.  Here is a brief overview of the reasoning behind the different tabs.
    </h4>

    <br>
    </br>

    <h5>
      Doctors Tab
    </h5>
    <p>
      The Doctors tab is for the individual family members to know who each others doctors are.  Possibly for referals to specialists.  In case you need to meet a family member at the doctors office in the event of an emergency.  Local Emergenct Room information can also be entered so that family members will know which emergency room a family member would be taken too.
      </p>
    <br>
    </br>
    <h5>
      Prescriptions Tab
    </h5>
    <p>
      The Prescriptions tab is important because people react differently to different prescriptions because of body chemistry.  for reglatory prescriptions often times you have to go through a listing of different prescriptions to find out which ones work best for you.  However under many circumstances prescriptions that work for you can also work for other family members because of the similar body chemistry, potentually reducing the number of doctors visits required to find a working regelatory prescription.
      </p>
    <br>
    </br>
    <h5>
      Notes Tab
    </h5>
    <p>
      The Notes tab is to keep track of questions that you would like discuss with the doctor at your next visit.  Because of the amount of time between doctors visits there are often times items that you would like to discuss with the doctor but because of the length of time between visits the items are forgotten or deemed unnecessary by the time of your next visit.
      </p>
    <br>
    </br>
    <h5>
      History Tab
    </h5>
    <p>
      Often times people dont know their own family history.  The questions asked on the intake forms are very important to determine which items to be extra cautious about.  Also the individual history will assist you in filling out those forms by keeping track of dates for last Tetanus Shots taken, etc...
      </p>


  </div>
);


export default (Home)