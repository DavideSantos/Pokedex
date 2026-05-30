import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 280 }}
      role="presentation"
      className="bg-slate-900 h-full text-white"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      {/* Sidebar Header */}
      <div className="p-6 border-b border-white/20">
        <img
          className="w-32 mx-auto mb-3 drop-shadow-lg"
          src="https://raw.githubusercontent.com/sleduardo20/pokedex/0671af442dff1d8f7141e49eb83b438885bbc9e9/public/img/logo.svg"
          alt="Pokemon Logo"
        />
        <p className="text-center text-white/80 text-sm font-semibold">
          Il Tuo Pokédex Digitale
        </p>
      </div>

      {/* Menu Items */}
      <List className="px-4 py-6 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 group">
          <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6">
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
            </svg>
          </div>
          <span className="font-semibold text-lg">Home</span>
        </Link>

        <Link
          to="/all-pokemon"
          className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 group">
          <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6">
              <path d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z" />
            </svg>
          </div>
          <span className="font-semibold text-lg">Tutti i Pokémon</span>
        </Link>
      </List>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-black/20">
        <p className="text-center text-white/60 text-xs">
          Creato con ❤️ by
          <br />
          <span className="font-bold text-white/80">Davide Santos</span>
        </p>
        <p className="text-center text-white/40 text-xs mt-2">
          Powered by PokéAPI
        </p>
      </div>
    </Box>
  );

  return (
    <div className="md:hidden">
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            sx={{
              minWidth: "auto",
              padding: "8px",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            sx={{
              zIndex: 9998,
            }}
            PaperProps={{
              sx: {
                background: "transparent",
                boxShadow: "none",
              },
            }}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
