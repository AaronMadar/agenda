import React, { useState, useRef } from "react";
import { Popover } from "@mui/material";
import dayjs from "dayjs";

import styles from "@/style/components/gantpage/ShibutsCard.module.css";
import { iconResources, iconServiceType } from "@/constants/icons";
import { PercentageWithArrow } from "@/components/shared/PercentageWithArrow";
import { ResourcePopUp } from "@/components/shared/pop-ups/ResourcePopUp";
import { KeyValPopUp } from "@/components/shared/pop-ups/KeyValPopUp";
import type { ShibutsApi, ResourceItem } from "@/types/api-response";
import Details from "@/assets/icons/details.svg?react";

dayjs.locale("he");

interface ShibutsCardProps {
  shibuts: ShibutsApi;
  pickud: string;
  style?: React.CSSProperties;
  className?: string;
}

export function ShibutsCard({
  shibuts,
  style,
  className,
  pickud,
}: ShibutsCardProps) {
  const [detailsAnchorEl, setDetailsAnchorEl] = useState<HTMLElement | null>(
    null,
  );
  const [resourceAnchorEl, setResourceAnchorEl] = useState<HTMLElement | null>(
    null,
  );
  const [titleAnchorEl, setTitleAnchorEl] = useState<HTMLElement | null>(null);
  const [hoveredResource, setHoveredResource] = useState<ResourceItem | null>(
    null,
  );

  const [isCardActive, setIsCardActive] = useState(false);

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    costOfItems,
  } = shibuts;

  const icon =
    iconServiceType[seviceType as keyof typeof iconServiceType] ??
    iconServiceType.default;
  const formattedBegin = dateBegin ? dayjs(dateBegin).format("D MMM") : "";
  const formattedEnd = dateEnd ? dayjs(dateEnd).format("D MMM") : "";

  const metadataShibuts = [
    { key: "קוד שיבוץ", value: codeShibuts },
    { key: "יחידה", value: pickud },
    { key: "משימה", value: mesima },
    { key: "עלות ישיר", value: String(directCost) },
    { key: "עלות פריטי", value: String(costOfItems) },
  ];

  const handleDetailsEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setDetailsAnchorEl(e.currentTarget);
  };

  const handleDetailsLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setDetailsAnchorEl(null);
    }, 100);
  };

  const handlePopoverEnter = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  };

  const handleCardLeave = () => {
    setIsCardActive(false);
    setDetailsAnchorEl(null);
    setResourceAnchorEl(null);
    setTitleAnchorEl(null);
  };

  return (
    <div
      className={`${styles.shibutsCard} ${isCardActive ? styles.activeCard : ""} ${className || ""}`}
      style={style}
      onMouseEnter={() => setIsCardActive(true)}
      onMouseLeave={handleCardLeave}
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
          className={`${styles.variationContainer} ${isCardActive ? styles.visible : ""}`}
        >
          <div className={styles.detailsAndPercentage}>
            <div
              className={styles.detailsButton}
              onMouseEnter={handleDetailsEnter}
              onMouseLeave={handleDetailsLeave}
            >
              <Details className={styles.detailsIcon} />
            </div>
            <PercentageWithArrow value={variationPastYear} gantMode />
          </div>
        </div>
      </div>

      <div className={styles.divDown} style={{ opacity: isCardActive ? 1 : 0 }}>
        <div className={styles.flexRow}>
          {formattedBegin && formattedEnd && (
            <span className={styles.spanDate}>
              {formattedBegin} - {formattedEnd}
            </span>
          )}

          {resources?.map((res, index) => (
            <div
              key={index}
              className={styles.divRessource}
              onMouseEnter={(e) => {
                setResourceAnchorEl(e.currentTarget);
                setHoveredResource(res);
              }}
              onMouseLeave={() => setResourceAnchorEl(null)}
              style={{ borderRight: index === 0 ? "none" : "1px solid #ccc" }}
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
        </div>
      </div>

      {/* Popover Details */}
      <Popover
        open={Boolean(detailsAnchorEl)}
        anchorEl={detailsAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        disableRestoreFocus
        sx={{ pointerEvents: "none" }}
        slotProps={{
          paper: {
            onMouseEnter: handlePopoverEnter,
            onMouseLeave: handleDetailsLeave,
            sx: {
              pointerEvents: "auto",
              backgroundColor: "transparent",
              boxShadow: "none",
              marginBottom: "5px",
            },
          },
        }}
      >
        <KeyValPopUp header={title} keyValues={metadataShibuts} />
      </Popover>

      {/* Popover Title */}
      <Popover
        open={Boolean(titleAnchorEl)}
        anchorEl={titleAnchorEl}
        sx={{ pointerEvents: "none" }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        slotProps={{
          paper: { sx: { backgroundColor: "transparent", boxShadow: "none" } },
        }}
      >
        <KeyValPopUp header={title} keyValues={metadataShibuts} />
      </Popover>

      {/* Popover Resource */}
      <Popover
        open={Boolean(resourceAnchorEl)}
        anchorEl={resourceAnchorEl}
        sx={{ pointerEvents: "none" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        slotProps={{ paper: { sx: { backgroundColor: "transparent" } } }}
      >
        <ResourcePopUp resourceDetailsTable={hoveredResource?.items || []} />
      </Popover>
    </div>
  );
}
