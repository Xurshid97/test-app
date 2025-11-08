# YouTrack MAIN_MENU_ITEM App Example

A simple YouTrack app demonstrating how to create a main menu item using the YouTrack App SDK.
The app fetches and displays a list of projects from your YouTrack instance and allows toggling a test feature per project.

## Features

- Adds a main menu item to the YouTrack interface.
- Fetches and displays projects with their names, short names, icons, and descriptions.
- Includes a toggle to enable or disable a test feature, with state persisted per project using YouTrack storage.

## Installation

1. Clone the repository to your local machine.
2. Build and package the app as a `.zip` including `manifest.json` and `widgets/`.
3. Open YouTrack → Administration → Extensions → Upload App.
4. Upload the `.zip` file and install the app.
5. You will see a new item in the main menu labeled **"Test-Main-Menu-Item"**.

## Usage

1. Click **"Test-Main-Menu-Item"** in the main menu.
2. View the list of projects fetched from YouTrack.
3. Use the toggle switch to enable or disable the test feature. The state is saved automatically per project.

## Development

- Modify the source files in `src/widgets/test-main-menu-item/`.
- Rebuild and repackage the app to see changes in YouTrack.
