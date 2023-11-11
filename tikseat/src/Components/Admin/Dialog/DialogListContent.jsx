import React from "react";
import CardContent from "@mui/material/CardContent";
import {
  StyledAvatar,
  StyledChip,
  StyledName,
  StyledOtherText,
} from "./DialogDetail";
import {
  LIST_NAME_CONTENT_DAILOG_CLIENT,
  LIST_NAME_CONTENT_DAILOG_ORGANIZER,
} from "../../../Assets/Constant/Admin/constAdmin";

function DialogListContent({ selectedDetail, isClient }) {
  const RenderCardClient = ({ selectedDetail }) => {
    return (
      <>
        <CardContent>
          <StyledAvatar src={selectedDetail?.avatarImage} />
          <StyledName variant="h6" gutterBottom>
            {selectedDetail?.full_name}
          </StyledName>
          <StyledOtherText variant="body2" color="textSecondary">
            {LIST_NAME_CONTENT_DAILOG_CLIENT[0]} {selectedDetail?.email}
          </StyledOtherText>
          <StyledOtherText variant="body2" color="textSecondary">
            {LIST_NAME_CONTENT_DAILOG_CLIENT[1]} {selectedDetail?.phone}
          </StyledOtherText>
          <StyledOtherText variant="body2" color="textSecondary">
            {LIST_NAME_CONTENT_DAILOG_CLIENT[2]} {selectedDetail?.birthday}
          </StyledOtherText>
          <StyledOtherText variant="body2" color="textSecondary">
            {LIST_NAME_CONTENT_DAILOG_CLIENT[3]} {selectedDetail?.age}
          </StyledOtherText>
          <StyledOtherText variant="body2" color="textSecondary">
            {LIST_NAME_CONTENT_DAILOG_CLIENT[4]} {selectedDetail?.gender}
          </StyledOtherText>
          <StyledOtherText variant="body2" color="textSecondary">
            {LIST_NAME_CONTENT_DAILOG_CLIENT[5]}
            {selectedDetail?.favorit_enres.map((value, index) => {
              return (
                <StyledChip label={value} variant="outlined" color="primary" />
              );
            })}
          </StyledOtherText>
        </CardContent>
      </>
    );
  };

  const RenderCardOrganizer = ({ selectedDetail }) => {
    return (
      <>
        <StyledAvatar src={selectedDetail?.avatarImage} />
        <StyledName variant="h6" gutterBottom>
          {selectedDetail?.organizer_name}
        </StyledName>
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
          {LIST_NAME_CONTENT_DAILOG_ORGANIZER[4]}{" "}
          {selectedDetail?.address.specific_address},{" "}
          {selectedDetail?.address.ward}, {selectedDetail?.address.district},{" "}
          {selectedDetail?.address.city}
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
  };

  return (
    <CardContent>
      {isClient ? (
        <RenderCardClient selectedDetail={selectedDetail} />
      ) : (
        <RenderCardOrganizer selectedDetail={selectedDetail} />
      )}
    </CardContent>
  );
}

export default DialogListContent;
