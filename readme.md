# Project

Complete Authentication setup as infastructure as code connected to AWS SAM / serverless / Lamba functions as a backend in React Native.

## How to

You can simply follow https://github.com/JohnGJackson0/serverless-restful-authentication. Then fork this repo or place into an existing project and replace the base url and it should be good to go!

### Architecture

Notice that in clean architecture the call flow !=== dependencies. The takeaway is if you inject the dependecy then you only need a 'type' to depend on. The type is in *your* control, what do you need in the actual code? Thus it will invert dependencies and the call flow remains the exact same. 

<img width="280" alt="image" src="https://user-images.githubusercontent.com/23160192/230359067-799164eb-97ff-400c-9678-9684544603c7.png">
<img width="448" alt="image" src="https://user-images.githubusercontent.com/23160192/230362928-333a7da7-5565-40e2-b475-87c14408c24b.png">
