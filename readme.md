# React Native Starter Kit

[![Move It](https://timedoor.net/wp-content/themes/timedoor/images/icons/logo-timedoor-black.svg)](https://timedoor.net)

This project aims to be a strong foundation for react-native applications. It provides a clear and organized structure,
core dependencies, and boilerplate to jumpstart development.

### Figma Template:

- [Master file](https://www.figma.com/file/9VyTropWyCxMlNjhRVdIrI/Timedoor-Design-System?node-id=544%3A5157)
- [Doc Components](https://www.figma.com/proto/9VyTropWyCxMlNjhRVdIrI/Timedoor-Design-System?page-id=626%3A5698&node-id=639%3A6746&viewport=298%2C219%2C0.18&scaling=min-zoom&starting-point-node-id=639%3A6746)

## Get Started

### Git Config

- Clone this repository 
- Change the package name to your project
- Change git origin to your project

### Installations

- `yarn install` or `npm install`
- `pod install` (Mac User)
- `react-native link`

## Base dependencies

- [axios](https://github.com/axios/axios) for networking.
- [react-native-config](https://github.com/luggit/react-native-config) to manage envionments.
- [react-navigation](https://reactnavigation.org/) navigation library.
- [i18next](https://github.com/i18next/i18next) internationalization-framework.
- [moment](https://github.com/moment/moment) date library for parsing, validating, manipulating, and formatting dates.
- [react-hook-form](https://github.com/react-hook-form/react-hook-form)  Performant, flexible and extensible forms with
  easy-to-use validation.
- [yup](https://github.com/jquense/yup) schema builder for runtime value parsing and validation.
- [react-native-svg](https://github.com/react-native-svg/react-native-svg) Please use svg for assets.
- [react-query](https://github.com/TanStack/query) Hooks for fetching, caching and updating asynchronous data in React.
- [react-native-modalize](https://github.com/jeremybarbet/react-native-modalize) A highly customizable modal/bottom
  sheet that loves scrolling content.
- [react-native-permissions](https://github.com/zoontek/react-native-permissions) A unified permissions API for React.
  Native on iOS, Android and Windows.
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) Icon source.
- [redux](https://github.com/reduxjs/redux) predictable state container for JavaScript apps.
- [redux-persist](https://github.com/rt2zz/redux-persist) staple project for Redux developers, both on mobile and on the
  web.
- Etc (see on package.json)

## Folder structure

This template follows a very simple project structure:

- `src`: This folder is the main container of all the code inside your application.
  - `assets`: Asset folder to store all images, vectors, fonts, locale etc.
  - `components`: Folder to store any common component that you use through your app (such as a generic button)
  - `models`: Folder to store any model that you have.
  - `providers`: Folder to store all your provider.
  - `navigations`: Folder to store the navigators.
  - `screens`: Folder that contains all your application screens/features.
  - `services`: Folder that contains the application storage logic.
  - `redux`: Folder that contains the application redux logic.
  - `utils`: Folder that contains the application utility logic.
  - free styles
- `tmd`: This folder is contains template code for starter kit


## Setup environments

### Using scripts from console

The template already has scripts to execute the project calling a specific environment defined into the package.json file. Keep in mind that if you are going to create new `envs` you have to define the script to build the project properly.

To define which env you want to use, just keep the structure `yarn [platform]: [environment]` 

DEBUG: `yarn ios:debug` or `yarn android:debug`

STAGING: `yarn ios:staging` or `yarn android:staging`

PRODUCTION: `yarn ios` or `yarn android`

Also, you can use npm following the same rule as before: `npm run ios:staging`

Modify the environment variables files in root folder (`.env.debug`, `.env.staging` and `.env`)


## Components

Components are the basic blocks of a react native application, but since we​​ aim to minimize development complexity, all the components are at the same nesting level.

Another important thing is the use of propTypes to check the kind of data that your components need to work properly. If the component receives some data from others, the type of these props must be defined, and in case you need it the default value of the property too.

### Static resources:

To keep an application scalable and organized, the global static resources that are used in the application have to be created in a specific file.

- Assets: Here you can store all the images and icons that you need through the app. You have as an example the icon
  ic_home.png, to respond with the different device screen densities just create inside the same folder the image and
  all the scaled versions that you need. RN only handles x1, x2 and x3 in this case, you have.
  - assets
    - icons
      - ic_home (PNG)
        - ic_home.png
        - ic_home@2x.png
        - ic_home@3x.png
      - ic_marker.svg (SVG)

### Components:

- Alert
- Avatar
- BottomSheet
  - AlertBottomSheet
  - ConfirmationBottomSheet
  - DateFilterBottomSheet
  - PickerBottomSheet
  - MultiPickerBottomSheet
- Badge
  - Badge
  - Ribbon
- Button
  - Button
  - IconButton
  - TextButton
- CheckBox
- Chip
- Divider
- FlatList
  - GridList
- Icon
- Image
  - ImageSlider
  - ImageZoom
- Layout
  - Grid
  - Stack
- Modal
  - ImageViewerModal
  - MapPickerModal
  - MapPlacePickerModal
  - PickerModal
- OTPInput
- Picker
  - DatePicker
  - DateRangePicker
  - TimePicker
  - MapPicker
  - PhoneField
  - ImagePicker
  - MultiImagePicker
- RadioButton
- RHF: (react-hook-form)
  - RHFTextField
  - RHFSelect
  - RHFSelectModal
  - RHFMultiSelect
  - RHFPhoneField
  - RHFDatePicker
  - RHFDateRangePicker
  - RHFTimePicker
- Select
  - Select
  - MultiSelect
  - SelectModal
- SignatureCanvas
- Skeleton 
- Tag
- TextInput
- Toast
- TouchableRipple
- Tooltip
  - Tooltip
  - TooltipStepper
- Typography

### Context Provider:

- ThemeProvider
- LocaleProvider
- BottomSheetProvider
- PermissionProvider
- AuthProvider
- ModalProvider
- TooltipStepperProvider

## StarterKit Usage

Clone this repo and read the code :)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://timedoor.net)
