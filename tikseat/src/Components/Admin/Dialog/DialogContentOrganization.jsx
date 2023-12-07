import React from "react";
import {
  StyledOtherText,
  StyledChip,
} from "./DialogDetail";

function DialogContentOrganization({
  LIST_NAME_CONTENT_DAILOG_ORGANIZER,
  selectedDetail,
}) {
  return (
    <>
      <StyledOtherText variant="body2" color="textSecondary">
        {LIST_NAME_CONTENT_DAILOG_ORGANIZER[0]} {selectedDetail?.email}
      </StyledOtherText>
      <StyledOtherText variant="body2" color="textSecondary">
        {LIST_NAME_CONTENT_DAILOG_ORGANIZER[1]} {selectedDetail?.phone}
      </StyledOtherText>
      <StyledOtherText variant="body2" color="textSecondary">
        {LIST_NAME_CONTENT_DAILOG_ORGANIZER[2]} {selectedDetail?.founded_date}
      </StyledOtherText>
      <StyledOtherText variant="body2" color="textSecondary">
        {LIST_NAME_CONTENT_DAILOG_ORGANIZER[3]} {selectedDetail?.website}
      </StyledOtherText>
      <StyledOtherText variant="body2" color="textSecondary">
        {LIST_NAME_CONTENT_DAILOG_ORGANIZER[4]} {selectedDetail?.address}
      </StyledOtherText>
      <StyledOtherText variant="body2" color="textSecondary">
        {LIST_NAME_CONTENT_DAILOG_ORGANIZER[5]}
        {selectedDetail?.organizer_type.map((value, index) => {
          return (
            <StyledChip label={value} variant="outlined" color="primary" />
          );
        })}
      </StyledOtherText>
      <StyledOtherText variant="body2" color="textSecondary">
        {LIST_NAME_CONTENT_DAILOG_ORGANIZER[6]}{" "}
        <StyledChip
          color={selectedDetail?.isActive ? "success" : "error"}
          label={selectedDetail?.isActive ? "Active" : "Inactive"}
          variant="outlined"
        />
      </StyledOtherText>
      <StyledOtherText variant="body2" color="textSecondary">
        {LIST_NAME_CONTENT_DAILOG_ORGANIZER[7]} {selectedDetail?.description}
      </StyledOtherText>
    </>
  );
}

export default DialogContentOrganization;
