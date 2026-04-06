"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3,
  FileDown,
  FileText,
  ImageOff,
  Files,
  Cloud,
  ArrowUpCircle,
  FileSearch,
  BookOpen,
  Users,
  Layers,
  Download,
  Calendar,
  ChevronDown
} from "lucide-react";
import FadeInSection from "../components/FadeInSection";

// Fix for TypeScript error with motion components
const MotionTr = motion.tr as any;

interface Document {
  name: string;
  thUrl?: string;
  enUrl?: string;
  cnUrl?: string;
  krUrl?: string;
  jpUrl?: string;
  created: string;
}

interface DocumentSection {
  title: string;
  items: Document[];
}

const documents: DocumentSection[] = [
  {
    title: "Documents",
    items: [
      { name: "Q.Soft MRP", thUrl: "/doc/Q-Soft_MRP_THV3.pdf", enUrl: "/doc/Q-Soft_MRP_ENGV3.pdf", created: "29.07.2025 10:19" },
      { name: "Q.Soft APS", thUrl: "/doc/APS_new.pdf", created: "14.08.2014 02:51" },
      { name: "Q.Soft WMS", created: "14.08.2014 02:51" },
      { name: "Q.Soft PM", thUrl: "/doc/Q.Soft_PM_V3Brochue(thai).pdf", created: "29.07.2025 10:19" },
      { name: "Q.Soft POS", thUrl: "/doc/Q_Soft_POS_V3Brochue(thai)600305.pdf", created: "29.07.2025 10:19" },
    ],
  },
  {
    title: "Brochure",
    items: [
      { name: "Power BI Advanced", thUrl: "/doc/CoursePowerBI-Advanced.jpg", created: "30.01.2023 10:01" },
      { name: "Power BI Basic", thUrl: "/doc/CoursePowerBI-Basic.jpg", created: "30.01.2023 10:01" },
      { name: "Smart Soft SCM", thUrl: "/doc/Smart_Soft_SCM_Brochure650610.pdf", created: "05.08.2020 15:25" },
      { name: "Q.Soft SCM", thUrl: "/doc/Q_Soft_SCM_Brochure6901.pdf", enUrl: "/doc/Q_Soft_SCM_Brochure(Eng)671008.pdf", cnUrl: "/doc/CN_Q_Soft_SCM_Brochure671008.pdf", krUrl: "/doc/KR_Q_Soft_SCM_Brochure671008.pdf", jpUrl: "/doc/JP_Q_Soft_SCM_Brochure671008.pdf", created: "06.12.2024 12:56" },
      { name: "Q.Soft SO Web Application", thUrl: "/doc/SOApp.jpg", created: "05.06.2020 02:51" },
      { name: "Q.Soft WMS (Warehouse Management System)", thUrl: "/doc/Q_Soft_MFG-WMS_Brochue(thai).pdf", enUrl: "/doc/Q_Soft_WMS_Prof+Brochue(Eng)V1.pdf", created: "01.08.2025 10:20" },
      { name: "Q.Soft Smart Tag", thUrl: "/doc/Medicine_Pay_Out_System(SmartTag).pdf", created: "14.08.2014 02:51" },
      { name: "Q.Soft CM (Container Management)", thUrl: "/doc/Q.soft_CM.pdf", created: "14.08.2014 02:51" },
      { name: "Q.Soft APS (Brochure)", thUrl: "/doc/Q_Soft_APS_Brochue(thai).pdf", created: "01.08.2025 10:20" },
      { name: "Q.Soft WMS (Service)", thUrl: "/doc/Q_Soft_Ser-WMS_Brochue(thai).pdf", created: "01.08.2025 10:20" },
      { name: "Q.Soft PM (Version 1.01)", thUrl: "/doc/Q.Soft_PM_V2Brochue6904-1.pdf", created: "01.08.2025 10:20" },
      { name: "Q.Soft SMS (Sport Management System)", thUrl: "/doc/Q_Soft_SMS_Brochue.pdf", created: "01.08.2025 10:20" },
      { name: "Q.soft ElectricShield", thUrl: "/doc/QSoftElectricShield.pdf", created: "14.08.2014 02:51" },
      { name: "DPS สำหรับโรงพยาบาล", thUrl: "/doc/DPS_1.pdf", created: "01.08.2025 10:20" },
    ],
  },
  {
    title: "WINSpeed",
    items: [
      { name: "WINSpeed", thUrl: "/doc/WINSpeed/winspeed_updated_0421.pdf", created: "09.04.2021 11:51" },
      { name: "การสำรองข้อมูล WINSpeed", thUrl: "/doc/WINSpeed/backup_WINSpeed.pdf", created: "29.07.2025 10:19" },
      { name: "การคีย์ใบเบิก ZZ, NW, WR", thUrl: "/doc/WINSpeed/CC.pdf", created: "29.07.2025 10:19" },
      { name: "การคำนวณต้นทุน", thUrl: "/doc/WINSpeed/COST.pdf", created: "29.07.2025 10:19" },
      { name: "ลบเอกสารที่ลบไม่ได้", thUrl: "/doc/WINSpeed/DELDOC.pdf", created: "29.07.2025 10:19" },
      { name: "การทำแบบฟอร์ม WINSpeed", thUrl: "/doc/WINSpeed/form_winspeed_myaccount.pdf", created: "29.07.2025 10:19" },
      { name: "การโพส GL", thUrl: "/doc/WINSpeed/GL.pdf", created: "29.07.2025 10:19" },
      { name: "การคีย์ ส่งคืน, ลดหนี้ (GR)", thUrl: "/doc/WINSpeed/GR.pdf", created: "29.07.2025 10:19" },
      { name: "การกำหนด Lot และ Serial", thUrl: "/doc/WINSpeed/IC.pdf", created: "29.07.2025 10:19" },
      { name: "ทำเช็ค 1 ใบ จ่ายชำระหลาย Invoice", thUrl: "/doc/WINSpeed/Invoice.pdf", created: "29.07.2025 10:19" },
      { name: "การขายเชื่อ", thUrl: "/doc/WINSpeed/IVAG.pdf", created: "29.07.2025 10:19" },
      { name: "Landed Cost", thUrl: "/doc/WINSpeed/Landed-Cost.pdf", created: "29.07.2025 10:19" },
      { name: "วิธีลง License", thUrl: "/doc/WINSpeed/License_HRMI.pdf", created: "29.07.2025 10:19" },
      { name: "การซื้อเชื่อ PO", thUrl: "/doc/WINSpeed/PO.pdf", created: "29.07.2025 10:19" },
      { name: "การโอนข้อมูลแบบ Manual เอกสาร PO, SO จากโปรแกรม WINSpeed เข้า Q.Soft ผ่าน API", thUrl: "/doc/WINSpeed/PO_SO_Manual_WINSpeed_Q.Soft.pdf", created: "29.07.2025 10:19" },
      { name: "การจ่ายชำระหนี้ PV", thUrl: "/doc/WINSpeed/PV.pdf", created: "29.07.2025 10:19" },
      { name: "การรับชำระหนี้ RE", thUrl: "/doc/WINSpeed/RE.pdf", created: "29.07.2025 10:19" },
      { name: "การรขายเชื่อ SO", thUrl: "/doc/WINSpeed/WINSpeed/SO.pdf", created: "29.07.2025 10:19" },
      { name: "ปรับปรุงสต็อกการ์ด เมื่อ TB ต้นทุนสินค้าถูกต้องแล้ว", thUrl: "/doc/WINSpeed/Stock_TB.pdf", created: "29.07.2025 10:19" },
      { name: "วิธีใส่ License ใหม่", thUrl: "/doc/WINSpeed_Delete_License.pdf", created: "14.08.2014 02:51" },
    ],
  },
  {
    title: "HRMI",
    items: [
      { name: "HRMI", thUrl: "/doc/HRMI/hrmi_updated_0421.pdf", created: "09.04.2021 11:51" },
      { name: "แก้ปัญหายอดรวมใน Pay Slip ไม่แสดง", thUrl: "/doc/HRMI/HR_HRMi.pdf", created: "29.07.2025 10:19" },
      { name: "คู่มือการใช้งานโปรแกรม HRMI", thUrl: "/doc/HRMI/Manual_HRMI_Payroll.pdf", created: "29.07.2025 10:19" },
      { name: "คู่มือการใช้งานโปรแกรม HRMI เพื่อทำเงินเดือน", thUrl: "/doc/HRMI/Manual_HRMI_Payroll_Full.pdf", created: "29.07.2025 10:19" },
      { name: "คู่มือการ Set Email Alert", thUrl: "/doc/HRMI/SetEmailAlertHRMi.pdf", created: "29.07.2025 10:19" },
    ],
  },
  {
    title: "CRM",
    items: [
      { name: "CRM", thUrl: "/doc/CRM/crm_updated_0421.pdf", created: "09.04.2021 11:51" },
    ],
  },
  {
    title: "Support & Other",
    items: [
      { name: "SpecServer-Cloud (QSoft-WINSpeed)", thUrl: "/doc/WINSpeed/SpecServer-Cloud(QSoft-WINSpeed).pdf", created: "23.09.2022 14:55" },
      { name: "LeanManufacturing (WhitePaper)", thUrl: "/doc/LeanManufacturing(WhitePaper).pdf", created: "14.08.2014 02:51" },
      { name: "SQL Server Express 2005", thUrl: "/doc/setupSQL2005.pdf", created: "29.07.2025 10:19" },
      { name: "SQL Server Express 2008 R2", thUrl: "/doc/setupSQL2008R2.pdf", created: "29.07.2025 10:19" },
      { name: "SQL Server Express 2012", thUrl: "/doc/setupSQL2012.pdf", created: "29.07.2025 10:19" },
      { name: "รายละเอียดแผนงานวางระบบ ISO9001-2008", thUrl: "/doc/ISO9001-2008Brochure.pdf", created: "29.07.2025 10:19" },
    ],
  },
];

export default function DocumentPage() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);

  const toggleSection = (title: string) => {
    setCollapsedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const showExtraLanguages = activeTab === "Brochure" || activeTab === "All";

  // Compute items to display
  const displayData = activeTab === "All" ? documents : [documents.find((doc) => doc.title === activeTab)].filter(Boolean) as DocumentSection[];

  const prevTab = useRef(activeTab);
  // Scroll to top of list when category changes
  useEffect(() => {
    if (prevTab.current !== activeTab) {
      const element = document.getElementById('doc-list-start');
      if (element) {
        const yOffset = -150;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      prevTab.current = activeTab;
    }
  }, [activeTab]);

  return (
    <div className="font-kanit min-h-screen bg-gray-50 pb-12">
      {/* Hero Header Section */}
      <FadeInSection>
        <div className="bg-white border-b overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--brand-blue)]/5 -skew-x-12 transform origin-top-right"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Section - Image & Title */}
              <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center">
                <div className="relative group flex-shrink-0">
                  <div className="absolute inset-0 bg-[var(--brand-blue)]/20 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-700"></div>
                  <div className="relative w-40 h-40 md:w-48 md:h-48 bg-slate-50 rounded-[2.5rem] overflow-hidden flex items-center justify-center border border-slate-100 shadow-sm transition-transform duration-500 group-hover:-rotate-3">
                    <Image
                      src="/img/download_from_cloud.png"
                      alt="Download"
                      width={140}
                      height={140}
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[var(--brand-blue)] rounded-full text-xs font-bold mb-4">
                    <BookOpen className="w-3 h-3" /> RESOURCES
                  </div>
                  <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                    Document <span style={{ color: "var(--brand-blue)" }}>Center</span>
                  </h1>
                  <p className="text-base md:text-lg text-slate-500 font-medium max-w-md leading-relaxed">
                    ศูนย์รวมคู่มือการใช้งานและโบรชัวร์ผลิตภัณฑ์ BCI สำหรับผู้ใช้งานและองค์กร
                  </p>
                </div>
              </div>

              {/* Right Section - Stats Card & Info Overlay */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-blue-50 rounded-xl">
                        <BarChart3 className="w-5 h-5 text-[var(--brand-blue)]" />
                      </div>
                      <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Overview</span>
                    </div>

                    <div className="space-y-4">
                      {[
                        { label: "ไฟล์ทั้งหมด", count: 39, color: "#0e9aef", icon: FileDown },
                        { label: "เอกสารคู่มือ", count: 11, color: "#10b981", icon: FileText },
                        { label: "โบรชัวร์", count: 23, color: "#8b5cf6", icon: ImageOff },
                      ].map((stat) => (
                        <div key={stat.label} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-lg bg-slate-50">
                              <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                            </div>
                            <span className="text-sm font-semibold text-slate-600">{stat.label}</span>
                          </div>
                          <span className="text-base md:text-lg font-bold text-slate-800">{stat.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--brand-blue)] p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-blue-200/50 text-white flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

                  <div className="relative z-10 flex items-center gap-2 mb-4 text-xs font-bold opacity-80 italic">
                    <ArrowUpCircle className="w-4 h-4" /> Recommended
                  </div>

                  <div className="relative z-10 mb-6">
                    <p className="text-xs md:text-sm opacity-90 leading-relaxed font-light italic">
                      "สำหรับการดาวน์โหลดแบบพิมพ์ จำเป็นต้องติดตั้ง Adobe Reader 5.0.5 ขึ้นไป"
                    </p>
                  </div>

                  <div className="relative z-10 pt-4 border-t border-white/20 text-[10px] tracking-widest uppercase opacity-60">
                    Last Updated: {new Date().toLocaleDateString("th-TH")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Content Section */}
      <div id="doc-list-start" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <FadeInSection delay={0.2}>
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
            {/* Tabs - Responsive Scrollable Container */}
            <div className="bg-white/80 backdrop-blur sticky top-0 z-30">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex p-3 gap-2 min-w-max">
                  <button
                    onClick={(e) => {
                      setActiveTab("All");
                      e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                    }}
                    className={`px-5 md:px-7 py-2.5 md:py-3.5 rounded-xl md:rounded-2xl font-bold transition-all text-xs md:text-sm flex items-center gap-2 ${activeTab === "All"
                      ? "bg-gray-600 text-white shadow-lg shadow-gray-20"
                      : "text-slate-500 hover:text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    <Layers className="w-4 h-4" />
                    All
                  </button>
                  {documents.map((section) => {
                    // Color theme mapping for document categories
                    const tabThemes: Record<string, { active: string, hover: string, text: string, shadow: string }> = {
                      "Documents": { active: "bg-blue-600", hover: "hover:bg-blue-100 hover:text-blue-600", text: "text-blue-600", shadow: "shadow-blue-20" },
                      "Brochure": { active: "bg-violet-600", hover: "hover:bg-violet-100 hover:text-violet-600", text: "text-violet-600", shadow: "shadow-violet-20" },
                      "WINSpeed": { active: "bg-emerald-600", hover: "hover:bg-emerald-100 hover:text-emerald-600", text: "text-emerald-600", shadow: "shadow-emerald-20" },
                      "HRMI": { active: "bg-amber-500", hover: "hover:bg-amber-100 hover:text-amber-500", text: "text-amber-500", shadow: "shadow-amber-20" },
                      "CRM": { active: "bg-rose-500", hover: "hover:bg-rose-100 hover:text-rose-500", text: "text-rose-500", shadow: "shadow-rose-20" },
                      "Support & Other": { active: "bg-indigo-600", hover: "hover:bg-indigo-100 hover:text-indigo-600", text: "text-indigo-600", shadow: "shadow-indigo-20" },
                    };
                    const theme = tabThemes[section.title] || tabThemes["Documents"];
                    return (
                      <button
                        key={section.title}
                        onClick={(e) => {
                          setActiveTab(section.title);
                          e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                        }}
                        className={`px-5 md:px-7 py-2.5 md:py-3.5 rounded-xl md:rounded-2xl font-bold transition-all text-xs md:text-sm flex items-center gap-2 ${activeTab === section.title
                          ? `${theme.active} text-white shadow-lg ${theme.shadow}`
                          : `text-slate-500 ${theme.hover}`
                          }`}
                      >
                        {section.title === "Documents" && <FileSearch className="w-4 h-4" />}
                        {section.title === "Brochure" && <ImageOff className="w-4 h-4" />}
                        {section.title === "WINSpeed" && <ArrowUpCircle className="w-4 h-4" />}
                        {section.title === "HRMI" && <Users className="w-4 h-4" />}
                        {section.title === "CRM" && <BarChart3 className="w-4 h-4" />}
                        {section.title === "Support & Other" && <Files className="w-4 h-4" />}
                        {section.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Info Message */}
            <div className="bg-[var(--brand-blue)]/5 px-4 md:px-6 py-4 flex items-start md:items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm shrink-0">
                <BookOpen className="w-4 h-4 text-[var(--brand-blue)]" />
              </div>
              <p className="text-xs md:text-sm text-slate-600">
                <span className="font-bold text-slate-800">Pro Tip:</span> ไฟล์ PDF สามารถเปิดอ่านจากเครื่องหรือโทรศัพท์ได้ทันที หากมีปัญหาให้ติดตั้ง Adobe Acrobat Reader
              </p>
            </div>


            <div>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 font-kanit">
                      <th className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">File Name</th>
                      <th className="px-6 py-5 text-center text-xs font-bold text-slate-400 font-kanit uppercase tracking-wider">
                        <div className="flex flex-col items-center gap-1.5">
                          <img src="/img/flags/32/Thailand.png" alt="TH" className="w-5 h-auto shadow-sm" />
                          <span>TH</span>
                        </div>
                      </th>
                      <th className="px-6 py-5 text-center text-xs font-bold text-slate-400 font-kanit uppercase tracking-wider">
                        <div className="flex flex-col items-center gap-1.5">
                          <img src="/img/flags/32/United-Kingdom.png" alt="EN" className="w-5 h-auto shadow-sm" />
                          <span>EN</span>
                        </div>
                      </th>
                      {showExtraLanguages && (
                        <>
                          <th className="px-6 py-5 text-center text-xs font-bold text-slate-400 font-kanit uppercase tracking-wider">
                            <div className="flex flex-col items-center gap-1.5">
                              <img src="/img/flags/32/China.png" alt="CN" className="w-5 h-auto shadow-sm" />
                              <span>CN</span>
                            </div>
                          </th>
                          <th className="px-6 py-5 text-center text-xs font-bold text-slate-400 font-kanit uppercase tracking-wider">
                            <div className="flex flex-col items-center gap-1.5">
                              <img src="/img/flags/32/South-Korea.png" alt="KR" className="w-5 h-auto shadow-sm" />
                              <span>KR</span>
                            </div>
                          </th>
                          <th className="px-6 py-5 text-center text-xs font-bold text-slate-400 font-kanit uppercase tracking-wider">
                            <div className="flex flex-col items-center gap-1.5">
                              <img src="/img/flags/32/Japan.png" alt="JP" className="w-5 h-auto shadow-sm" />
                              <span>JP</span>
                            </div>
                          </th>
                        </>
                      )}
                      <th className="px-8 py-5 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Release</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {displayData.map((section) => {
                      // Color theme mapping for section headers
                      const headerThemes: Record<string, { text: string, bg: string }> = {
                        "Documents": { text: "text-blue-600", bg: "bg-blue-50/50" },
                        "Brochure": { text: "text-violet-600", bg: "bg-violet-50/50" },
                        "WINSpeed": { text: "text-emerald-600", bg: "bg-emerald-50/50" },
                        "HRMI": { text: "text-amber-600", bg: "bg-amber-50/50" },
                        "CRM": { text: "text-rose-600", bg: "bg-rose-50/50" },
                        "Support & Other": { text: "text-indigo-600", bg: "bg-indigo-50/50" },
                      };
                      const theme = headerThemes[section.title] || headerThemes["Documents"];

                      return (
                        <React.Fragment key={section.title}>
                          {activeTab === "All" && (
                            <tr
                              onClick={() => toggleSection(section.title)}
                              className="cursor-pointer select-none group/section"
                            >
                              <td colSpan={showExtraLanguages ? 7 : 4} className="px-8 py-4">
                                <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full transition-all hover:brightness-95 ${theme.bg} ${theme.text}`}>
                                  <div className="text-xs font-black uppercase tracking-[0.25em]">
                                    {section.title}
                                  </div>
                                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${collapsedSections.includes(section.title) ? "-rotate-90" : ""}`} />
                                </div>
                              </td>
                            </tr>
                          )}
                          {(activeTab !== "All" || !collapsedSections.includes(section.title)) && section.items.map((item, index) => (
                            <MotionTr
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              key={`${item.name}-${index}`}
                              className="hover:bg-slate-50 transition-colors group"
                            >
                              <td className="px-8 py-5">
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${theme.bg.replace('/50', '')}`}>
                                    <FileText className={`w-4 h-4 ${theme.text}`} />
                                  </div>
                                  <span className="text-slate-700 font-semibold text-sm">{item.name}</span>
                                </div>
                              </td>
                              {/* TH */}
                              <td className="px-4 py-5 text-center text-sm">
                                {item.thUrl ? (
                                  <Link href={item.thUrl} target="_blank" className="inline-flex items-center gap-1.5 text-slate-500 font-bold hover:text-slate-800 hover:underline transition-all">
                                    <Download className="w-3.5 h-3.5" /> TH
                                  </Link>
                                ) : <span className="text-slate-300">-</span>}
                              </td>
                              {/* EN */}
                              <td className="px-4 py-5 text-center text-sm">
                                {item.enUrl ? (
                                  <Link href={item.enUrl} target="_blank" className="inline-flex items-center gap-1.5 text-slate-500 font-bold hover:text-slate-800 hover:underline transition-all">
                                    <Download className="w-3.5 h-3.5" /> EN
                                  </Link>
                                ) : <span className="text-slate-300">-</span>}
                              </td>
                              {showExtraLanguages && (
                                <>
                                  <td className="px-4 py-5 text-center text-sm">
                                    {item.cnUrl ? (
                                      <Link href={item.cnUrl} target="_blank" className="inline-flex items-center gap-1.5 text-slate-500 font-bold hover:text-slate-800 hover:underline transition-all">
                                        <Download className="w-3.5 h-3.5" /> CN
                                      </Link>
                                    ) : <span className="text-slate-300">-</span>}
                                  </td>
                                  <td className="px-4 py-5 text-center text-sm">
                                    {item.krUrl ? (
                                      <Link href={item.krUrl} target="_blank" className="inline-flex items-center gap-1.5 text-slate-500 font-bold hover:text-slate-800 hover:underline transition-all">
                                        <Download className="w-3.5 h-3.5" /> KR
                                      </Link>
                                    ) : <span className="text-slate-300">-</span>}
                                  </td>
                                  <td className="px-4 py-5 text-center text-sm">
                                    {item.jpUrl ? (
                                      <Link href={item.jpUrl} target="_blank" className="inline-flex items-center gap-1.5 text-slate-500 font-bold hover:text-slate-800 hover:underline transition-all">
                                        <Download className="w-3.5 h-3.5" /> JP
                                      </Link>
                                    ) : <span className="text-slate-300">-</span>}
                                  </td>
                                </>
                              )}
                              <td className="px-8 py-5 text-right">
                                <span className="text-[10px] text-slate-400 font-mono">{item.created}</span>
                              </td>
                            </MotionTr>
                          ))}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile List/Card View */}
              <div className="md:hidden divide-y divide-slate-100">
                {displayData.map((section) => {
                  const headerThemes: Record<string, { text: string, bg: string }> = {
                    "Documents": { text: "text-blue-600", bg: "bg-blue-50" },
                    "Brochure": { text: "text-violet-600", bg: "bg-violet-50" },
                    "WINSpeed": { text: "text-emerald-600", bg: "bg-emerald-50" },
                    "HRMI": { text: "text-amber-600", bg: "bg-amber-50" },
                    "CRM": { text: "text-rose-600", bg: "bg-rose-50" },
                    "Support & Other": { text: "text-indigo-600", bg: "bg-indigo-50" },
                  };
                  const theme = headerThemes[section.title] || headerThemes["Documents"];

                  return (
                    <div key={section.title}>
                      {activeTab === "All" && (
                        <div
                          onClick={() => toggleSection(section.title)}
                          className="px-4 py-4 cursor-pointer select-none"
                        >
                          <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full ${theme.bg} ${theme.text}`}>
                            <span className="text-xs font-black tracking-[0.25em] uppercase">{section.title}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${collapsedSections.includes(section.title) ? "-rotate-90" : ""}`} />
                          </div>
                        </div>
                      )}
                      {(activeTab !== "All" || !collapsedSections.includes(section.title)) && (
                        <div className="divide-y divide-slate-100">
                          {section.items.map((item, idx) => (
                            <div key={idx} className="p-4 bg-white">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[var(--brand-blue)] shrink-0">
                                    <FileText className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-slate-800 text-sm leading-tight mb-1">{item.name}</h4>
                                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                                      <Calendar className="w-3 h-3" />
                                      <span>{item.created}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                {item.thUrl && (
                                  <a href={item.thUrl} target="_blank" className="flex-1 min-w-[105px] flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-bold active:bg-slate-600 active:text-white transition-colors">
                                    <img src="/img/flags/32/Thailand.png" className="w-4 h-auto shadow-sm" alt="" /> TH
                                  </a>
                                )}
                                {item.enUrl && (
                                  <a href={item.enUrl} target="_blank" className="flex-1 min-w-[105px] flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-bold active:bg-slate-600 active:text-white transition-colors">
                                    <img src="/img/flags/32/United-Kingdom.png" className="w-4 h-auto shadow-sm" alt="" /> EN
                                  </a>
                                )}
                                {item.cnUrl && (
                                  <a href={item.cnUrl} target="_blank" className="flex-1 min-w-[85px] flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-bold">
                                    <img src="/img/flags/32/China.png" className="w-4 h-auto shadow-sm" alt="" /> CN
                                  </a>
                                )}
                                {item.krUrl && (
                                  <a href={item.krUrl} target="_blank" className="flex-1 min-w-[85px] flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-bold">
                                    <img src="/img/flags/32/South-Korea.png" className="w-4 h-auto shadow-sm" alt="" /> KR
                                  </a>
                                )}
                                {item.jpUrl && (
                                  <a href={item.jpUrl} target="_blank" className="flex-1 min-w-[85px] flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-bold">
                                    <img src="/img/flags/32/Japan.png" className="w-4 h-auto shadow-sm" alt="" /> JP
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
