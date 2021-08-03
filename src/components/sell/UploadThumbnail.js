import { Box } from '@chakra-ui/react';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { HiPlusCircle } from 'react-icons/hi';

export default function UploadThumbnail({ setFiles, setFieldValue }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    multiple: false,
    accept: 'image/jpeg, image/png',
    paramName: function () {
      return 'files';
    },
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      console.log(acceptedFiles[0]);
      setFieldValue('thumbnail', acceptedFiles[0]);
    },

    init: function () {
      this.on('addedfile', function (file) {
        if (this.files.length > 1) {
          alert('You can only upload one file');
          this.removeFile(this.files[0]);
        }
      });
    },
  });
  return (
    <Box
      bgSize="contain"
      bgRepeat="no-repeat"
      bgPosition="center center"
      border="3px"
      rounded="lg"
      my="2rem"
      borderStyle="dashed"
      borderColor="gray.500"
      position="relative"
      height="300px"
    >
      <Box
        position="absolute"
        width="100%"
        height="100%"
        top="0"
        bgColor="RGBA(63,212,159,0.3)"
        left="0"
        bottom="0"
        cursor="pointer"
        display="flex"
        justifyContent="center"
        alignItems="center"
        _hover={{
          bg: 'RGBA(63,212,159,0.05)',
        }}
        p="3rem"
        {...getRootProps()}
      >
        <input type="file" name="thumbnail" {...getInputProps()} />

        <HiPlusCircle size={90} color="teal" />
      </Box>
    </Box>
  );
}
