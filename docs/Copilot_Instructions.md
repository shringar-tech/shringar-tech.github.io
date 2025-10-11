# Copilot Instructions for This Repository

## Overview
This repository contains the source code for an e-commerce website showcasing and selling Indian ethnic clothes. The website is built using React and includes features like category pages, item detail pages, and a contact page. Below are the instructions for using GitHub Copilot effectively in this repository.

---

## General Guidelines
1. **Understand the Project Structure**:
   - Familiarize yourself with the folder structure, especially the `src/` directory where the main React components are located.
   - Refer to the `data/` folder for JSON files containing product information.

2. **Follow Coding Standards**:
   - Use consistent naming conventions for variables, functions, and components.
   - Write clean and modular code by breaking down large components into smaller, reusable ones.

3. **Use Copilot for Suggestions**:
   - Leverage Copilot to generate boilerplate code for React components, CSS styles, and utility functions.
   - Use Copilot to autocomplete repetitive tasks like mapping over JSON data or creating JSX elements.

---

## Specific Instructions

### 1. Adding New Components
- **Steps**:
  1. Create a new file in the `src/components/` directory.
  2. Use Copilot to generate the basic structure of a React component.
  3. Add the necessary imports and export the component.

- **Example**:
  ```javascript
  import React from 'react';

  const NewComponent = () => {
      return (
          <div>
              {/* Add your JSX here */}
          </div>
      );
  };

  export default NewComponent;
  ```

### 2. Styling Components
- **Steps**:
  1. Create a corresponding CSS file in the `src/components/` directory.
  2. Use Copilot to generate CSS rules based on the component's structure.
  3. Import the CSS file into the component.

- **Example**:
  ```javascript
  import './NewComponent.css';
  ```

### 3. Fetching Data from JSON Files
- **Steps**:
  1. Import the JSON file into the component.
  2. Use Copilot to map over the data and render it dynamically.

- **Example**:
  ```javascript
  import data from '../data/sarees.json';

  const SareeList = () => {
      return (
          <div>
              {data.map((item) => (
                  <div key={item.id}>
                      <h3>{item.name}</h3>
                      <p>{item.price}</p>
                  </div>
              ))}
          </div>
      );
  };

  export default SareeList;
  ```

### 4. Debugging and Testing
- **Steps**:
  1. Use Copilot to write test cases for components.
  2. Debug issues by checking the browser console and reviewing the component's logic.

- **Example**:
  ```javascript
  test('renders component correctly', () => {
      render(<NewComponent />);
      expect(screen.getByText(/some text/i)).toBeInTheDocument();
  });
  ```

---

## Best Practices
1. **Optimize Performance**:
   - Use React's `useMemo` and `useCallback` hooks where necessary.
   - Avoid unnecessary re-renders by using `React.memo` for functional components.

2. **Ensure Accessibility**:
   - Use semantic HTML elements.
   - Add `aria` attributes for better accessibility.

3. **Test Across Devices**:
   - Test the website on different screen sizes to ensure responsive design.
   - Use browser developer tools to simulate mobile and tablet views.

---

## Notes
- Refer to the `Website_Functionality_Requirement.md` file for detailed functionality requirements.
- Use GitHub Copilot as a tool to assist with coding but always review the generated code for accuracy and relevance.

---

## Future Enhancements
- Automate the generation of product cards using Copilot.
- Use Copilot to suggest improvements for existing components and styles.
- Leverage Copilot to integrate new features like a shopping cart or search functionality.
