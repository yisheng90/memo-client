## Idea Board

This project is an idea board build on React.js. 

The live version of the app is [here](https://yisheng90.github.io/memo-client/).

The backend services repo can be found [here](https://github.com/yisheng90/memo-server).

![Demo](https://media.giphy.com/media/lP3sOa4OgCNnMOlObH/giphy.gif)

### Requirements

In this app, 

1. The ideas are displayed as tiles, with a height and width of 150px and a 10px margin, aligned horizontally to fit screen width.
2. The user should be able to create a new idea by clicking '+ New idea' button.
3. The 'Title' filed of the newly created idea should be focused.
4. The 'Title' and 'Body' fields of the idea should be editable.
5. Blurring any of the input fields should trigger an update.
6. Each tile should have a delete icon which should only be visible when hovering over the tile. 

### Bonus

In the app, 

1. The user can sort the idea base on 'Title' or 'Create Date'.
2. A character counter will be shown to user if the 'Body' field character is 15 lesser to reach io 140.
3. Notification will be displayed when user update the field successfully.

### Technical Spec

This app is build on the following stack:

1. Main Stack
     -  React.js (Create React App)
     -  Babel
     
2. Test
     - Jest
     - @testing-library/react
     
3. Formatting
     - Eslint
     - Prettier

### Questions:

**1. What frameworks might be useful to manage the complexity of this problem?** 

**A:** The following frameworks/libraries cloud be helpful for addressing this problem.
    
General:

- Lodash
    This utility library can help is sorting.

- React Progressive Loader
    React progressive loading can improve user exigence and performance especially when the number of idea is getting larger.

- Bootstrap
    This library may help in layout configuration of the app. 
    
- styled-components
    This library provides a very neat way for developer to amend the style of the component.
    It also allow developer to write all HTML element as a component.


Quality:

- prop-types (implemented)
    This library helps developer to identify potential bug during development by doing the prop type checking for the component.
    
      
**2. How would you extend this project if you had more time?**

**A:** If I were given more time, I would:

General:

- Move the sorting to backend service.
- Introduce caching in LocalStorage to improve user experience on first load.
- Explore to server-side rendering.
- Improve performance by eliminating unnecessary re-rendering. 

Quality:

- Write test for hooks functions. 
- Implementing type checking for helper functions. This can be done using `prop-types` library. However, I would prefer to convert the project to TypeScript.

Others:

- Implement Storybook to each component.
- Move reusable component to a shared UI library.
     

**3. How would you make this work on a mobile device?**

**A:** In order to make this app work on mobile, we need to:

  - Define breakpoint to style the component different on smaller screen size. 
  - Implement library like `react-with-gesture` to help events such as pointer event to be use in mobile devices. ([pointer event is current not supported on safari and ios](
)))] 