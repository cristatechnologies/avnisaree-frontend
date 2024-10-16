import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
 
export function DrawerDefault() {
  const [open, setOpen] = React.useState(false);
 
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
 
  return (
    <React.Fragment>
          <Button onClick={ openDrawer }>
              <span>
                      <svg
                        width="14"
                        height="10"
                        color="#ffff"
                        viewBox="0 0 14 10"
                        className="fill-current text-orange-700"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="14" height="2"  />
                        <rect y="8" width="14" height="2"  />
                        <rect y="4" width="10" height="2"  />
                      </svg>
                    </span>
      </Button>
      <Drawer overlay={false}  open={open} onClose={closeDrawer} className="p-4 z-50" >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Categories
          </Typography>
          <IconButton variant="text" color="orange" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <Typography color="gray" className="mb-8 pr-4 font-normal">
         Category list will goes here
        </Typography>
        {/* <div className="flex gap-2">
          <Button size="sm" variant="outlined">
            Documentation
          </Button>
          <Button size="sm">Get Started</Button>
        </div> */}
      </Drawer>
    </React.Fragment>
  );
}