import React, { useState } from "react";
import { Popover } from "@mui/material";
import dayjs from "dayjs";

import styles from "@/style/components/gantpage/ShibutsCard.module.css";
import { iconResources, iconServiceType } from "@/constants/icons";
import { PercentageWithArrow } from "@/components/shared/PercentageWithArrow";
import { ResourcePopUp } from "@/components/shared/pop-ups/ResourcePopUp";
import { KeyValPopUp } from "@/components/shared/pop-ups/KeyValPopUp";
import type { ShibutsApi, ResourceItem } from '@/types/api-response';

dayjs.locale("he");

interface ShibutsCardProps {
  shibuts: ShibutsApi;
  pickud: string;
  style?: React.CSSProperties;
  className?: string;
}

export function ShibutsCard({ shibuts, style, className, pickud }: ShibutsCardProps) {
  const [resourceAnchorEl, setResourceAnchorEl] = useState<HTMLElement | null>(null);
  const isResourceOpen = Boolean(resourceAnchorEl);

  const [titleAnchorEl, setTitleAnchorEl] = useState<HTMLElement | null>(null);
  const isTitleOpen = Boolean(titleAnchorEl);

  const [hoveredResource, setHoveredResource] = useState<ResourceItem | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const {
    title,
    variationPastYear,
    dateBegin,
    dateEnd,
    resources,
    seviceType,
    codeShibuts,
    mesima,
    directCost,
    costOfItems
  } = shibuts;

  const icon =
    iconServiceType[seviceType as keyof typeof iconServiceType] ??
    iconServiceType.default;

  const formattedBegin = dateBegin ? `${dayjs(dateBegin).format("D MMM")}\`` : "";
  const formattedEnd = dateEnd ? `${dayjs(dateEnd).format("D MMM")}\`` : "";

  const metadataShibuts = [
    { key: "קוד שיבוץ", value: codeShibuts },
    { key: "יחידה", value: pickud },
    { key: "משימה", value: mesima },
    { key: "עלות ישיר", value: String(directCost) },
    { key: "עלות פריטי", value: String(costOfItems) },
  ];

  return (
    <div
      className={`${styles.shibutsCard} ${className || ""}`}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.divUp}>
        <div
          className={styles.iconAndTitle}
          onMouseEnter={(e) => setTitleAnchorEl(e.currentTarget)}
          onMouseLeave={() => setTitleAnchorEl(null)}
        >
          <i className={`icon-card ${icon.className}`} />
          <span className={styles.cardTitle}>{title}</span>
        </div>

        <div
          className={`${styles.variationContainer} ${isHovered ? styles.visible : ""
            }`}
        >
          <PercentageWithArrow value={variationPastYear} gantMode />
        </div>
      </div>

      <Popover
        open={isTitleOpen}
        anchorEl={titleAnchorEl}
        onClose={() => setTitleAnchorEl(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        disableRestoreFocus
        sx={{ pointerEvents: "none" }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          },
        }}
      >
        <KeyValPopUp header={title} keyValues={metadataShibuts} />
      </Popover>

      <div className={styles.divDown }>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "nowrap",
            overflow: "hidden",
            

          }}
        >
          {formattedBegin && formattedEnd && (
            <span className={styles.spanDate}>
              {formattedBegin} - {formattedEnd}
            </span>
          )}

          {resources &&
            resources.map((res, index) => (
              <div
                key={index}
                className={styles.divRessource}
                onMouseEnter={(e) => {
                  setResourceAnchorEl(e.currentTarget);
                  setHoveredResource(res);
                }}
                onMouseLeave={() => {
                  setResourceAnchorEl(null);
                  setHoveredResource(null);
                }}
                style={{
                  borderRight: index === 0 ? "none" : "1px solid #ccc",
                }}
              >
                <i
                  className={
                    iconResources[
                    res.categoryName as keyof typeof iconResources
                    ] ?? iconResources.default
                  }
                />
                <span>{res.categoryName}</span>
              </div>
            ))}

          <Popover
            open={isResourceOpen}
            anchorEl={resourceAnchorEl}
            onClose={() => setResourceAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            sx={{ pointerEvents: "none" }}
            disableRestoreFocus
            slotProps={{
              paper: {
                sx: {
                  borderRadius: "8px",
                  backgroundColor: "transparent",
                },
              },
            }}
          >
            <ResourcePopUp
              resourceDetailsTable={hoveredResource?.items || []}
            />
          </Popover>
        </div>
      </div>
    </div>
  );
}
