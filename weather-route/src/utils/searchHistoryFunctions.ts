import type { SearchHistoryItem } from "@/types";

const HISTORY_KEY = 'searchHistory';
const MAX_HISTORY_ITEMS = 100;
export const HOME_PAGE_HISTORY_ITEMS = 10

export function saveSearchToHistory(searchHistoryItem: SearchHistoryItem) {
  try {
    // 1. Retrieve the existing history array from local storage
    const existingHistoryStr = localStorage.getItem(HISTORY_KEY);
    let history: SearchHistoryItem[] = [];

    if (existingHistoryStr) {
      history = JSON.parse(existingHistoryStr);
    }

    history.unshift(searchHistoryItem);

    // 3. (Optional) Limit the size of the array
    if (history.length > MAX_HISTORY_ITEMS) {
      history = history.slice(0, MAX_HISTORY_ITEMS);
    }

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error("Failed to save search history to localStorage:", error);
  }
}

export function getSearchHistory(): SearchHistoryItem[] {
  try {
    const existingHistoryStr = localStorage.getItem(HISTORY_KEY);
    return existingHistoryStr ? JSON.parse(existingHistoryStr) : [];
  } catch (error) {
    console.error("Failed to retrieve search history from localStorage:", error);
    return [];
  }
}

export function deleteAllSearchHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY)
  } catch (error) {
    console.log("Error deleting history items")
  }
}
