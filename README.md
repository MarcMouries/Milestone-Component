# Milestone tracker component

This custom component for the Now Experience provides a very intuitive way to visualize  the progress of a record in ServiceNow. It was built to be very easily configured in UI Builder

## Mode Options
The component supports two modes:

- **Static Mode**: Manually configure a list of stages and set the currently active stage. This mode is suitable for predefined, non-dynamic workflows.
- **Record Mode**: Specify a table and the `sysId` of a record. The component will automatically fetch the list of stages and the current stage based on the record's data.

## Size Options
Choose from three sizes to ensure the component fits various layouts:

- **Small**
- **Medium**
- **Large**

## Stage Configuration
- **Static Mode**:
  - Define your own list of stages.
  - Set the `currentStage` property to indicate the active stage.

- **Record Mode**:
  - Ensure the specified `table` contains a field named `stage` of the type 'workflow', with a list of stages defined.
  - The component fetches these stages and the current stage from the record automatically.

These configuration options allow the Milestone Tracker to be versatile, fitting different scenarios within ServiceNow, adaptable to both static and dynamic workflows.


![Preview of Milestone tracker](./doc/milestone-tracker.png)

## Prerequisites
1. Install Node version v16.
    * It's the version supported by the ServiceNow CLI

2. Now CLI @26.5.0
    * Install ServiceNow CLI
    Download from the [ServiceNow App Store](https://store.servicenow.com/sn_appstore_store.do#!/store/application/9085854adbb52810122156a8dc961910/1.1.0?referer=%2Fstore%2Fsearch%3Flistingtype%3Dallintegrations%25253Bancillary_app%25253Bcertified_apps%25253Bcontent%25253Bindustry_solution%25253Boem%25253Butility%25253Btemplate%26q%3DServiceNow%2520CLI&sl=sh)

3. Configure the ServiceNow CLI to communicate with a ServiceNow instance
    ```
    snc configure profile set
    ```

4. Add ServiceNow CLI UI Component
    ```
    snc extension add --name ui-component
    ```

5.  You may need to run this command if you get disconnected from your instance
    ```
    snc ui-component login {instance_url} basic {user_name} {password}
    ```

## Installation

1. Fork this repo into your GitHub account.
    * You can fork any repo by clicking the fork button in the upper right hand corner of a repo page.
2. Clone the fork of your repo, so you can edit the contents locally
    ```
    git clone <repo url>
    ```
3. Install the required components
    ```
    npm install
    ```
3. Test the component locally
    ```
    snc ui-component develop --open
    ```
4. Deploy the component to a ServiceNow instance
    ```
    snc ui-component deploy --force
    ```
5. Make edits to your local cloned copy of the repo on your computer

6. Add, commit and push those edits back to your fork on GitHub

7. Suggest the changes that you made, to be added to the origianl repo using a pull request



## Troubleshooting

. Run the following command
    ```
    snc extension update --name ui-component
    ```