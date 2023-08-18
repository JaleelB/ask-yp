import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { type location, type IpInfoResponse } from '@/lib/types';
import { env } from "@/env.mjs";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getGeoLocation(ipAddress: string): Promise<location | null> {

    const LOCALHOST_IP = "::1";
    const MOCK_LOCATION: location = { latitude: 40.7128, longitude: -74.0060 }; // Example: New York City

    if (ipAddress === LOCALHOST_IP) {
        console.warn("Using mock location for localhost IP");
        return MOCK_LOCATION;
    }

    try {
        const response = await fetch(`https://ipinfo.io/${ipAddress}?token=${env.IPINFO_TOKEN}`);

        if (!response.ok) {
            throw new Error("Failed to fetch geolocation.");
        }

        const data = await response.json() as IpInfoResponse;

        if (!data.loc) {
            throw new Error("Location data is missing.");
        }

        const coords = data.loc.split(',');

        // Check if we have both latitude and longitude
        if (coords.length !== 2) {
            throw new Error("Unexpected location format.");
        }

        const latitude = parseFloat(coords[0]!);
        const longitude = parseFloat(coords[1]!);

        if (isNaN(latitude) || isNaN(longitude)) {
            throw new Error("Failed to parse latitude or longitude");
        }

        return {
            latitude,
            longitude
        };

    } catch (error) {
        console.error("Error fetching geolocation:", error);
        return null;
    }
}





