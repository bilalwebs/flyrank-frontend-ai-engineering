"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Analytics placeholder component.
 * Replace MEASUREMENT_ID with your actual Google Analytics measurement ID
 * after deployment.
 *
 * Example: G-XXXXXXXXXX
 */
const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (!MEASUREMENT_ID) return

    // Placeholder: Log page views in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics] Page view: ${pathname}`)
    }

    // TODO: Integrate with Google Analytics or Vercel Analytics
    // Example with gtag:
    // window.gtag("config", MEASUREMENT_ID, {
    //   page_path: pathname,
    // })
  }, [pathname])

  return null
}
