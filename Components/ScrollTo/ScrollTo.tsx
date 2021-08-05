import { useScrollTrigger, Zoom } from "@material-ui/core";

interface Props {
  children: React.ReactElement;
}

// <Toolbar id="back-to-top-anchor" />
{
  /* <ScrollTop>
  <Fab color="secondary" size="small" aria-label="scroll back to top">
    <KeyboardArrowUp />
  </Fab>
</ScrollTop>; */
}

const ScrollTo = (props: Props) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role="presentation"
        style={{ position: "fixed", bottom: "16px", right: "16px" }}
      >
        {children}
      </div>
    </Zoom>
  );
};

export default ScrollTo;
