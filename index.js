$(document).ready(function () {
    // Submit the entered post id
    $('#postIdForm').submit(function (event) {
        event.preventDefault();

        const postId = $('#postId').val();
        /**
         * Use GET request to fetch the post details.
         * Populate the update form with the post data.
         */
        $.ajax({
            url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
            method: 'GET',
            success: function (data) {
                $('#postIdUpdate').val(postId);
                $('#title').val(data.title);
                $('#body').val(data.body);
                $('#postDetails').show();
                $('#updatedPost').hide();
                $('#response').html('');
            },
            error: function (error) {
                $('#response').html(`<p>Error fetching post with ID ${postId}.</p>`);
            },
        });
    });

    /**
     * Adds a set of two fields.
     * @param {string} customKey which stores the custom key.
     * @param {string} customValue which stores the custom value.
     * They can be added dynamically and without a limit.
     */
    $('#addFieldButton').click(function () {
        const customFieldsDiv = $('#customFields');
        const newField = `
                            <label for="customKey">Custom field key:</label>
                            <input type="text" class="custom-key" name="customKey[]" required>
                            <label for="customValue">Custom field value:</label>
                            <input type="text" class="custom-value" name="customValue[]" required>
                            <br>
                        `;
        customFieldsDiv.append(newField); // The fields are added in the customFields div
    });

    /**
     * Use the PUT method to update the post details.
     */
    $('#updateForm').submit(function (event) {
        event.preventDefault();

        /**
         * Get the values from the update form and store each in a variable.
         */
        const postId = $('#postIdUpdate').val();
        const title = $('#title').val();
        const body = $('#body').val();
        const customKeyInput = $('input[name="customKey[]"]');
        const customValueInput = $('input[name="customValue[]"]');

        /**
         * Store the title and body in a variable postData.
         * We shall use this variable to store the custom fields below.
         */
        const postData = {
            title: title,
            body: body,
        };

        /**
         * Iterate through the custom keys.
         * If there are some, add them to the postData object.
         */
        $(customKeyInput).map(function (index) {
            const customKey = $(this).val();
            const customValue = $(customValueInput).eq(index).val(); // Use .eq(index) to get the corresponding value
            if (customKey && customValue) {
                postData[customKey] = customValue;
            }
        });

        /**
         * Submit using an AJAX request.
         * This returns the post with the updated details.
         */
        $.ajax({
            url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
            method: 'PUT',
            data: JSON.stringify(postData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            success: function (data) {
                $('#postDetails').hide(); // Hide the update form
                $('#updatedPost').show(); // Display the updated post details
                $('#updatedTitle').text(data.title);
                $('#updatedBody').text(data.body);
                displayUpdatedCustomFields(data); // Display any custom fields available
                $('#response').html(`<p>Post ID: ${postId} updated successfully.</p>`);
            },
            error: function (error) {
                $('#response').html(`<p>Error updating post ID: ${postId}.</p>`);
            },
        });
    });
});

/**
 * Helper function which updates and displays custom fields.
 * @param {Object} data key-value pairs containing the post details
 */
function displayUpdatedCustomFields(data) {
    const updatedCustomFieldsDiv = $('#updatedCustomFields');
    updatedCustomFieldsDiv.empty();

    for (const key in data) {
        /**
         * Checks for fields which aren't title or body.
         * Selects only custom fields.
         */
        if (key !== 'title' && key !== 'body') {
            const fieldValue = data[key];
            const customFieldHtml = `
                                <p><b>${key}:</b> ${fieldValue}</p>
                            `;
            updatedCustomFieldsDiv.append(customFieldHtml);
        }
    }
}