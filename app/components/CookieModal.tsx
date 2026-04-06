"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { XCircle } from "lucide-react";

export default function CookieModal() {
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        console.log("CookieModal Debug: Force showing modal");
        setIsVisible(true);
    }, []);

    const acceptCookie = () => {
        // Set cookie for 30 days
        document.cookie = "Cookie_QSoft=QsoftUser; max-age=" + 60 * 60 * 24 * 30 + "; path=/";
        setIsVisible(false);
    };

    const closeCookie = () => {
        setIsVisible(false);
    };

    if (!mounted || !isVisible) return null;

    return (
        <div
            className="fixed bottom-10 right-10 z-[9999] max-w-[365px] flex flex-col items-center text-center 
                  bg-[var(--brand-blue)] text-white p-6 rounded-[15px] shadow-[0_20px_50px_rgba(0,0,0,0.3)]
                  opacity-100 scale-100 ring-4 ring-[#fcba7f]"
        >
            <div className="absolute top-2 right-2">
                <button
                    onClick={closeCookie}
                    className="text-red-500 hover:text-red-600 transition-colors opacity-80 hover:opacity-100"
                    title="Close"
                >
                    <XCircle size={30} fill="white" color="red" />
                </button>
            </div>

            {/* Cookie Icon */}
            {/* 
         If you have the SVG in public/img/cookies-policy.svg, use Image.
         Otherwise, I'll use a placeholder or FontAwesome icon if available.
         ERP uses: img/cookies-policy.svg. I'll try to use that path.
      */}
            <div className="w-[90px] h-[90px] relative mb-2">
                {/* Fallback to simple icon if image missing, but try to load image */}
                <img
                    src="/img/cookies-policy.svg"
                    alt="Cookie Policy"
                    className="object-contain w-full h-full"
                />
            </div>

            <div className="mt-2">
                <header className="text-2xl font-semibold mb-1 font-kanit">การใช้และการจัดการคุกกี้</header>
                <p className="text-sm font-light mb-5 font-kanit">
                    บริษัทมีการใช้เทคโนโลยี เช่น คุกกี้ (cookies)
                    และเทคโนโลยีที่คล้ายคลึงกันบนเว็บไซต์ของบริษัท
                    เพื่อสร้างประสบการณ์การใช้งานเว็บไซต์ของท่านให้ดียิ่งขึ้น
                </p>

                <div className="flex items-center justify-center gap-4 font-kanit">
                    <button
                        onClick={acceptCookie}
                        className="bg-[#fcba7f] text-white hover:scale-95 transition-transform px-5 py-2.5 rounded-[5px] font-medium"
                    >
                        ยอมรับ
                    </button>
                    <Link
                        href="/privacypolicy"
                        className="text-[#fcba7f] hover:underline text-sm font-medium"
                    >
                        รายละเอียดเพิ่มเติม
                    </Link>
                </div>
            </div>
        </div>
    );
}
