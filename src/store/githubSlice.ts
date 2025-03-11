import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GitHubUser, Repository } from "../types/User";

interface GitHubState {
  users: GitHubUser[];
  repositories: Record<string, Repository[]>;
  isLoadingUser: boolean;
  isLoadingRepo: boolean;
  error: string | null;
}

const initialState: GitHubState = {
  users: [],
  repositories: {},
  isLoadingUser: false,
  isLoadingRepo: false,
  error: null,
};

const api = axios.create({
  baseURL: "https://api.github.com",
});

export const fetchUsers = createAsyncThunk(
  "github/fetchUsers",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/search/users`, {
        params: { q: query, per_page: 5 },
      });
      return response.data.items || [];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

export const fetchRepositories = createAsyncThunk(
  "github/fetchRepositories",
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${username}/repos`);
      return { username, repos: response.data };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch repositories"
      );
    }
  }
);

const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoadingUser = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoadingUser = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.error = action.error.message || "Error fetching users";
      })

      .addCase(fetchRepositories.pending, (state) => {
        state.isLoadingRepo = true;
        state.error = null;
      })
      .addCase(fetchRepositories.fulfilled, (state, action) => {
        state.isLoadingRepo = false;
        state.repositories[action.payload.username] = action.payload.repos;
      })
      .addCase(fetchRepositories.rejected, (state, action) => {
        state.isLoadingRepo = false;
        state.error = action.error.message || "Error fetching repositories";
      });
  },
});

export default githubSlice.reducer;
