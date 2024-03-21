import PropTypes from "prop-types";
import isString from "lodash/isString";
import { useDropzone } from "react-dropzone";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
//
import Image from "../Image";
import RejectionFiles from "./rejectionFIle";
import BlockContent from "./blogContent";
import UserList from "./list/userList";

// ----------------------------------------------------------------------

const DropZoneStyle = styled("div")(({ theme }) => ({
  outline: "none",
  overflow: "hidden",
  position: "relative",
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("padding"),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
}));

// ----------------------------------------------------------------------

UploadSingleFile.propTypes = {
  error: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  helperText: PropTypes.node,
  sx: PropTypes.object,
};

export default function UploadSingleFile({
  error = false,
  file,
  helperText,
  sx,
  csvData,
  doHandleFormSubmit,
  ...other
}) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple: false,
    accept: ".csv", // Restrict to CSV files only
    ...other,
  });

  return (
    <div className="center">
      <Box sx={{ width: "50%", ...sx }}>
        {csvData && (
          <>
            <DropZoneStyle
              {...getRootProps()}
              sx={{
                ...(isDragActive && { opacity: 0.72 }),
                ...((isDragReject || error) && {
                  color: "error.main",
                  borderColor: "error.light",
                  bgcolor: "error.lighter",
                }),
                ...(file && {
                  padding: "12% 0",
                }),
              }}
            >
              <input {...getInputProps()} />

              <BlockContent />
            </DropZoneStyle>
            <Button onClick={doHandleFormSubmit}>Submmit File</Button>
          </>
        )}

        {/* {csvData && (
          // <table>
          //   <thead>
          //     <tr>
          //       {csvData[0]?.map((cell, index) => (
          //         <th key={index}>{cell}</th>
          //       ))}
          //     </tr>
          //   </thead>
          //   <tbody>
          //     {csvData.slice(1)?.map((row, rowIndex) => (
          //       <tr key={rowIndex}>
          //         {row.map((cell, cellIndex) => (
          //           <td key={cellIndex}>{cell}</td>
          //         ))}
          //       </tr>
          //     ))}
          //   </tbody>
          // </table>
          // <UserList csvData={csvData} />
        )} */}
        {fileRejections.length > 0 && (
          <RejectionFiles fileRejections={fileRejections} />
        )}

        {helperText && helperText}
      </Box>
    </div>
  );
}
