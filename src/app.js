const discovery = require('./aws/findServiceURL')

exports.handler = async function(event, context) {
  try {
    await discovery.generateEndpoints();
  }
  catch (error){
    console.log(error);
  }
  
}

