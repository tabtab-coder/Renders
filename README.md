Video: https://www.youtube.com/watch?v=3bjI1snezkQ

# Team The ABC: Renders

Anthony Ding - 1005088726

Batuhan Dover - 1004820517

Cheryl Chen - 1004848123

# Our Focus

Our focus will be frontend focused, where we will be using frontend WebVR libraries to build an online room decorating/planner application that allows user to create their own virtual rooms and decorate the rooms with their friends.

### Tech Stack

#### Frontend framework: Angular

Use of opinionated framework for better structure and more maintainable + efficient development for the project. Single page application also provide better user experiences as there will be less page reloads that appears slower to the users.

#### CSS framework: Tailwind CSS

Better organization and structure for styling our application such that the system will be easier to develop and debug as we move on with our project. Keeping the code clean from possible unused or unnecessary code.

#### Database: PotgreSQL

Since we have clear structures and relations in the data that we would need to store (users, rooms, furnitures etc.), we will use SQL.

#### Backend framework: Nest.js

It uses javascript and has many resources online that allows us to better learn and quickly develop the application than if we use other frameworks.

#### Deployment: DigitalOcean, Nginx

Database and the website will be hosted on DigitalOcean droplet with the use of nginx. Git action will also be created for auto deployments when pushed to main.

# Description

Our idea of the online collaborative room planning application is the leverage the potential of web VR engines to allow users to plan and decorate their rooms ahead of time while renting or buying a new home. Instead of having to use more technical applications to get a sense of how the rooms would be designed, they can easily palce objects into a 3D space on the web with others to try things out ahead of time. The potential of this app also has great extensibility to easily swap and add more features due to its modularity, such as scanning a floorplan or blueprint into producing the virtual rooms, or more customization options in terms of the features that the current virutal room feature would provide, and even extending user interactions on the web to user interactions in VR so they can navigate and decorate the room in VR (cross platforms).

# Complexity Points

- A-Frame(3): Providing 3D environment for virtual rooms
- threejs(2): Computer graphics calculations necessary for decoration features
- Auth0(1): User system for the application
- yjs/yjs(3): Collaborative room decorating functionality
- ~meilisearch(3): Community page for browsing furnitures that user can upload~

Complexity: ~12~ -> 9

# Aims

### Alpha Version (March 6th)

We hope to have a basic structure of the online shop that includes:

- Database setup
- User system (Login)
- Basic virtual room decorating features (Aframe and threejs setup)

### Beta Version (March 20th)

We hope to have more essential features that includes:

- User collaborating feature (yjs)
- Virtual room decorating features interactions (for collaborating)

### Final Version (April 3rd)

- Working application
