// disable eslint for this file
/* eslint-disable */
import { useState, useEffect } from 'react';

export const fetchDataFromURL = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const dotIndex = url.lastIndexOf('.');
    if (dotIndex === -1) {
      throw new Error('Unsupported format');
    }

    const extension = url.substring(dotIndex + 1).toLowerCase();

    switch (extension) {
      case 'json':
        const jsonData = await response.json();
        return jsonData;
      case 'csv':
        const csvData = await response.text();
        return csvData;
      default:
        return response;
    }
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};
