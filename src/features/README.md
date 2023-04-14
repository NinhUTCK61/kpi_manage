# features folder structure

### The features folder contains all the feature files and step definitions for the project.

### The folder structure is as follows:

```
features
├───feature-name <- this is a feature folder
│   └───components <- this folder contains all the shared components used in the feature
│   └───views <- this folder contains all the view(pages) used in the feature
│       └───View1.ts <- this is a view
│       └───View2.ts <- this is a view
│       └───view-large <- this folder contains all the large components used in the view
│           └───components    <- optional folder for small or common components
│           └───LargeView1.ts <- this is a large component
│           └───LargeView2.ts <- this is a large component
│           └───index.ts      <- this export all large components
│       └───index.ts <- this export all views
│   └───hooks <- optional folder for hooks
│   └───types <- optional folder for types
│   └───utils <- optional folder for utils
│   └───constants.ts <- optional file for constants
│   └───... <-- some other necessary folders for features like services, store, etc.
│   └───index.ts <- this export all components, views, hooks, types, utils or simple export views
│...............................................................................................
├───feature-name2 <- this is a feature folder
├───feature-name3 <- this is a feature folder
│
└───index.ts <- this export all features
```
