# Weather-App

This app uses a simple weather API toi provide weather details.

#V-1

Weather-App V1, uses hard-coded name for a city to make API call.

#V-2 

Weather-App V2, takes user preference for the method for getting the city name,

The 2 methods available are:

1. Using IP Address: Uses 'ip-api' API to get IP address of the local device, from the 'ip-api' response we extract thr city name whcih we use to get city specific weather details using 'goweather' API

2. Taking City Name as an input: In this method, the app takes city name as input from the user and fetches data for that city using 'goweather' API 
