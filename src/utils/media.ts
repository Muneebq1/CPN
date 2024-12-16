/* eslint-disable @typescript-eslint/ban-ts-comment */

export const openGallery = (): Promise<string | null> => {
  return new Promise((resolve) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string); // Resolve with the base64 image data URL
        };
        reader.onerror = () => resolve(null); // Handle errors
        reader.readAsDataURL(file); // Read file as base64
      } else {
        resolve(null); // If no file selected, resolve with null
      }
    };
    fileInput.click(); // Trigger the file picker dialog
  });
};

// export const openGallery = () => {
//   try {
//     return new Promise((resolve, reject) => {
//       const input = document.createElement('input');
//       input.type = 'file';
//       input.accept = 'image/*';

//       input.onchange = (event) => {
//         const file = event.target?.files?.[0];
//         if (file) {
//           resolve(file);
//         } else {
//           resolve(null);
//         }
//       };

//       input.click();
//     });
//   } catch (error) {
//     console.error('Error in openGallery function:', error);
//     return null;
//   }
// };

export const appendImageToFormData = (
  formData: FormData,
  name: string,
  image: string,
) => {
  if (!image) {
    formData.append(name, '');
  } else if (image.startsWith('file:///')) {
    const localImageUri = image;
    const imageFile = {
      uri: localImageUri,
      name: 'image.jpg',
      type: 'image/jpeg',
    };
    // @ts-ignore
    formData.append(name, imageFile);
  }
};
