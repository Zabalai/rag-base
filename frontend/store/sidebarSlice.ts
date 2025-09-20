import { createSlice } from '@reduxjs/toolkit';

export interface SidebarState {
  collapsed: boolean;
}

const initialState: SidebarState = {
  collapsed: false,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
    toggleCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
  },
});

export const { setCollapsed, toggleCollapsed } = sidebarSlice.actions;
export default sidebarSlice.reducer;
