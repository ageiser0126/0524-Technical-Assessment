

# Wizards - Technical Assessment
Technical Assessment

To Run - 
npm install
node server.js

Server runs on local host - http://localhost:8080/ 

The simulated external source will count up to 100 degress Celsius in using various increments. Once 100 degrees is reached it will count down to 0 in the same fashion. 



----- Test instructions ---

Design and implement (in the OO language of your choice) a thermometer class or classes that read the temperature of some external source. 

The thermometer needs to be able to provide temperature in both Fahrenheit and Celsius.  It must be possible for callers of the class(es) to define arbitrary thresholds such as freezing and boiling at which the thermometer class will inform the appropriate callers that a specific threshold has been reached. 

Note that callers of the class may not want to be repeatedly informed that a given threshold has been reached if the temperature is fluctuating around the threshold point. For example, consider the following temperature readings from the external source:

 - 1.5 C
 - 1.0 C
 - 0.5 C
 - 0.0 C
 - -0.5 C
 - 0.0 C
 - -0.5 C
 - 0.0 C
 - 0.5 C
 - 0.0 C

Some callers may only want to be informed that the temperature has reached 0 degrees C once because they consider fluctuations of +/- 0.5 degrees insignificant. It may also be important for some callers to be informed that a threshold has been reached only if the threshold was reached from a certain direction. For example, some callers may only care about a freezing point threshold if the previous temperature was above freezing (i.e. they only care about the threshold if it occurred while the temperature was dropping).

## **Reflections - 05/02/2024**

 

**The following reflections are the result of a ~30 min review prior to 5/3 meeting.**

 - The server needs to support long polling request in the case web
   sockets are not available or preferred by the front end application. 
 - The object that is sent to the client *(server.js #48)* would be
   better stored in a defined class for unit testing and future
   maintainability.    
   
 - It would be beneficial to have the date/time of
   when the alert was triggered sent back to the client and stored with
   the client session data. this could be used to help manage alerts and
   be useful information to display in the UI.
   
 - ExternalTemperatureSource.js while this is a placeholder it should be
   encapsulated into a class to improve management, readability and
   future maintainability. 
   
 - Error trapping is needed for when incorrect client settings are
   submitted to server.js #36
      
 - *Tech Debt* 
	 - Unnecessary line break temperatureController.js #39 
	 - Unused constant externalTemperatureSource.js #8
