# A HTML form that will submit using AJAX.

This simple application allows the user to fetch a post by entering and ID. The post details are displayed in a form. There is an `Add Custom Field` button which allows the user to add custom fields letting them define any key and value, while updating the post details.

The updated details including the custom fields are then displayed upon successful update.

## Deployment and installation

To run this project, just clone the repository and open the webpage.

```bash
  git clone https://github.com/mkahara/html-form-with-ajax.git
```

## Usage

After opening the webpage, enter the Post ID and click `Fetch Post`. The input allows only IDs within the range of 1-100 as per the JSONPlaceholder API resources.

The AJAX request returns the post details which are displayed in a form to allow for updating.

There is another button `Add Custom Field` which allows the user to add custom fields in a key-value pair. The user can add as many custom fields as they wish.

On clicking the `Update Post` button, the post details are updated together with the custom fields added by the user.

## Provide a reasoning for why you used the AJAX method you used compared to alternatives.
I used the jQuery AJAX ```$.ajax()``` method for my implementation. This is because the jQuery API is simple and easy to use. It provides a clear way to define the HTTP method, data and success and error callbacks which make it easy to provide feedback to the browser (Front end). Achieving this with another method such as XMLHttpRequest requires writing alot of code making it complex and harder to read.

Also cosidering that this application is lightweight and doesn't involve complex operations which would have require use of a method like Fetch API, the ```$.ajax()``` works better for this use case.

## Author

Your Name
- GitHub: [mkahara](https://github.com/mkahara)

## Thank you!