BMI=new Mongo.Collection('BMI');


if (Meteor.isClient) {
  // counter starts at 0
var height,weight,bmi,createdAt;
  Session.setDefault('counter', 0);



 Session.setDefault('h', 0);
  Session.setDefault('w', 0);
   Session.setDefault('d', new Date());
  Session.setDefault('bm',0);



  Template.body.helpers({
bodymassi:function()
{
  return BMI.find();
},
comment:function()
{
  if(Session.get('bm')<=18.5)
    return "Underweight. Follow a routine balanced diet.";
  if((Session.get('bm')>18.5)&&(Session.get('bm')<=25))
return "in the Normal Range of BMI. Good Going.";
if((Session.get('bm')>25)&&(Session.get('bm')<=30))
return "Overweight. Get some exercise.";
if(Session.get('bm')>30)
    return "Obese. Consult a Doctor.";
},
'BMY':function()
{
  if(Session.get('bm')>0)
  return true;
else
  return false;
}

  });

  Template.body.helpers({

currentHeight:function()
{
  return Session.get('h');
},
  currentWeight:function()
{
  return Session.get('w');
},
  currentBMI:function()
{
  return Session.get('bm');
},
currentDate:function()
{
  return Session.get('d');
}
});


  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.body.events({

"submit .universe":function(event)
{
 weight=event.target.weight.value;
 height=event.target.height.value;
if(weight===0)
  sAlert.warning('Error',{effect:'scale',html:true});

 heightType=event.target.heights.value;
 weightType=event.target.weights.value;
 if(heightType==="Inches")
  height=(height*2.54)/100;
if(heightType==="Feet")
  height=(height*12*2.54)/100;
if(weightType==="pound")
  weight=weight/2.2;
if(weightType==="ounce")
  weight=(weight*0.0625)/2.2;
 bmi=weight/(height*height);
bmi=bmi.toFixed(2);
 createdAt=new Date();

BMI.insert({
  height:height,
  weight:weight,
  bmi:bmi,
  createdAt:createdAt
});
  Session.set('h',height);
  Session.set('w',weight);
  Session.set('bm',bmi);
  Session.set('d',createdAt);
  event.target.height.value="";
  event.target.weight.value="";
  return false;
}



  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
