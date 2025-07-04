// src/utils/helpers.js

/**
 * Formats a date string into a readable format
 * @param {string} dateString - Date string (e.g., "2023-05-15")
 * @returns {string} Formatted date (e.g., "May 15, 2023")
 */

export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  /**
   * Converts minutes to hours and minutes format
   * @param {number} minutes - Total runtime in minutes
   * @returns {string} Formatted runtime (e.g., "2h 15m")
   */
  export const convertRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  /**
   * Gets the appropriate backdrop image URL
   * @param {string} path - Image path from API
   * @param {string} [size='original'] - Image size
   * @returns {string} Complete image URL
   */
  export const getBackdropUrl = (path, size = 'original') => {
    return path 
      ? `https://image.tmdb.org/t/p/${size}${path}`
      : '/placeholder-backdrop.jpg';
  };
  
  /**
   * Gets the appropriate poster image URL
   * @param {string} path - Image path from API
   * @param {string} [size='w500'] - Image size
   * @returns {string} Complete image URL
   */
  export const getPosterUrl = (path, size = 'w500') => {
    return path 
      ? `https://image.tmdb.org/t/p/${size}${path}`
      : '/placeholder-poster.jpg';
  };
  
  /**
   * Gets the appropriate profile image URL
   * @param {string} path - Image path from API
   * @param {string} [size='w200'] - Image size
   * @returns {string} Complete image URL
   */
  export const getProfileUrl = (path, size = 'w200') => {
    return path 
      ? `https://image.tmdb.org/t/p/${size}${path}`
      : '/placeholder-profile.jpg';
  };
  
  /**
   * Formats a number with commas (e.g., 1000 → "1,000")
   * @param {number} number - Number to format
   * @returns {string} Formatted number
   */
  export const formatNumber = (number) => {
    return number?.toLocaleString() || '0';
  };
  
  /**
   * Converts a vote average to percentage
   * @param {number} voteAverage - Vote average (0-10)
   * @returns {string} Percentage (e.g., "85%")
   */
  export const convertToPercent = (voteAverage) => {
    return voteAverage ? `${Math.round(voteAverage * 10)}%` : 'N/A';
  };
  
  /**
   * Extracts year from date string
   * @param {string} dateString - Date string
   * @returns {string} Year (e.g., "2023")
   */
  export const getYearFromDate = (dateString) => {
    return dateString ? new Date(dateString).getFullYear() : '';
  };
  
  /**
   * Capitalizes the first letter of each word
   * @param {string} str - Input string
   * @returns {string} Capitalized string
   */
  export const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };
  
  /**
   * Truncates text to a specific length
   * @param {string} text - Input text
   * @param {number} maxLength - Maximum length
   * @returns {string} Truncated text with ellipsis if needed
   */
  export const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    return text.length > maxLength 
      ? `${text.substring(0, maxLength)}...` 
      : text;
  };
  
  /**
   * Gets the appropriate icon for a media type
   * @param {string} mediaType - 'movie', 'tv', or 'person'
   * @returns {JSX.Element} React icon component
   */
  export const getMediaTypeIcon = (mediaType) => {
    const icons = {
      movie: '🎬',
      tv: '📺',
      person: '⭐'
    };
    return icons[mediaType] || '🎥';
  };
 
  export default {
    formatDate,
    convertRuntime,
    getBackdropUrl,
    getPosterUrl,
    getProfileUrl,
    formatNumber,
    convertToPercent,
    getYearFromDate,
    capitalizeWords,
    truncateText,
    getMediaTypeIcon
    
  };