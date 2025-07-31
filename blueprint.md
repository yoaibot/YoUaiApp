# Cadastro Social App Blueprint

This document outlines the plan for creating a Flutter application based on the provided React (`.tsx`) files. The goal is to replicate the functionality and user experience of the social registration and admin dashboard applications in a single, well-structured Flutter project.

## 1. Project Structure

The project will follow a modular architecture to ensure separation of concerns and maintainability.

```
/lib
  /app
    /api
      - api_service.dart
      - data_transformer.dart
    /models
      - question_model.dart
      - user_data_model.dart
    /modules
      /admin_dashboard
        /controllers
        /pages
          - admin_dashboard_page.dart
        /widgets
      /social_registration
        /controllers
          - social_registration_controller.dart
        /pages
          - welcome_page.dart
          - block_menu_page.dart
          - question_page.dart
          - block_completion_page.dart
          - final_success_page.dart
        /widgets
          - animated_cabiano_widget.dart
          - progress_bar_widget.dart
    /services
      /camera
        - camera_service.dart
      /local_storage
        - local_storage_service.dart
      /location
        - location_service.dart
      /voice
        - text_to_speech_service.dart
        - speech_to_text_service.dart
    /utils
      /helpers
        - app_helpers.dart
      /routes
        - app_routes.dart
      /themes
        - app_themes.dart
  - main.dart
```

## 2. Dependencies

The following packages will be added to `pubspec.yaml`:

- **provider**: For state management.
- **google_fonts**: For custom fonts.
- **flutter_svg**: For the animated "Cabiano" character.
- **geolocator**: For location services.
- **camera**: For taking pictures of documents.
- **image_picker**: For selecting images from the gallery.
- **speech_to_text**: For voice input.
- **flutter_tts**: For text-to-speech functionality.
- **shared_preferences**: For local storage.
- **percent_indicator**: For progress bars.
- **lucide_flutter**: For icons.

## 3. Screen Implementation Plan

### Social Registration Flow

1.  **Welcome Screen (`welcome_page.dart`)**
    -   Display the animated "Cabiano" character.
    -   Show the welcome message and "Start" button.
    -   Use `flutter_tts` to speak the welcome message.

2.  **Block Menu Screen (`block_menu_page.dart`)**
    -   Display the different question blocks in a grid.
    -   Show completion status for each block.
    -   Display overall progress.

3.  **Question Screen (`question_page.dart`)**
    -   A dynamic screen that adapts to the current question type.
    -   Implement widgets for each question type:
        -   Text/Voice input (`speech_to_text`)
        -   Yes/No buttons
        -   Single and multiple-choice options
        -   Date picker
        -   Number stepper
        -   Location capture (`geolocator`)
        -   Document photo (`camera`, `image_picker`)
    -   Integrate `flutter_tts` to read questions and options.

4.  **Block Completion Screen (`block_completion_page.dart`)**
    -   Show a success message after a block is completed.
    -   Provide a "Continue" button to return to the block menu.

5.  **Final Success Screen (`final_success_page.dart`)**
    -   Display a final success message with a summary of the collected data.
    -   Provide options to restart the registration or view/print the data.

### Admin Dashboard

1.  **Dashboard Screen (`admin_dashboard_page.dart`)**
    -   This will be implemented after the registration flow is complete.
    -   It will include:
        -   Statistical cards.
        -   Charts and graphs.
        -   A list of recent registrations.
        -   A map view with data points (initially simulated, can be integrated with a map provider later).

## 4. State Management

-   **`ChangeNotifierProvider`** will be used to manage the state of the registration process.
-   A `SocialRegistrationController` will handle the business logic, such as navigating between questions, storing answers, and tracking progress.

## 5. Animated Character

-   The "Cabiano" character will be implemented as a stateful widget (`AnimatedCabianoWidget`).
-   It will use `flutter_svg` for rendering and will have animations for speaking, pointing, and celebrating, similar to the React version.

## 6. Services

-   Wrapper classes will be created for each of the external services (camera, location, etc.) to abstract the implementation details and make them easily replaceable or mockable for testing.

## 7. Next Steps

1.  Create the folder structure.
2.  Add the required dependencies to `pubspec.yaml`.
3.  Create the data models.
4.  Implement the welcome screen.
5.  Proceed with the rest of the registration flow screens.
6.  Implement the admin dashboard.

## 8. Version Control Best Practices

- The `build/` directory, which contains compiled application output, is automatically generated and should not be tracked by version control systems like Git. This prevents unnecessary large files and conflicts in the repository. It has been added to `.gitignore`.
