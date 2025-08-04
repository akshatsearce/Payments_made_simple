'use client'

import React, { useState, ReactNode } from 'react';
import {ChevronLeft, X, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";

interface NavItemProps {
  href?: string;
  onClick?: ()=>{};
  icon: ReactNode;
  children: ReactNode;
  active?: boolean;
  notificationCount?: number;
  hasAction?: boolean;
}
 
export const NavItem: React.FC<NavItemProps> = ({ href, icon, children, notificationCount, hasAction ,onClick }) => {
  const pathname = usePathname(); // Get the current URL path
  // For Pages Router, you would use: const { asPath } = useRouter();
  const router = useRouter()
  const active = pathname === href;

  return (
    <div onClick={()=>{
      if (href){
        router.push(href)
      }
      if(onClick)
      {
        onClick()
      }
    }}>
      <div
        className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
          active ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800'
        }`}
      >
        {icon}
        <span className="ml-4 flex-1 font-medium">{children}</span>
        {notificationCount && (
          <span className="bg-yellow-400 text-gray-900 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {notificationCount}
          </span>
        )}
        {hasAction && (
          <div className="bg-gray-700 rounded-md p-0.5">
            <Plus size={16} className="text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
};

export const UpdateCard: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  if (!isVisible) return null;

  return (
    <div className="bg-gray-800 rounded-lg p-4 relative mt-6">
       <button onClick={() => setIsVisible(false)} className="absolute top-2 right-2 text-gray-500 hover:text-white">
        <X size={18} />
      </button>
      <h3 className="font-bold text-white text-md mb-2">New Update!</h3>
      <ul className="text-gray-400 text-sm list-disc list-inside space-y-1 mb-4">
        <li>Added messenger</li>
        <li>Clearer icons</li>
        <li>Bug fixes</li>
      </ul>
       <div className="absolute bottom-10 right-4">
          <svg width="60" height="40" viewBox="0 0 78 53" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-lime-300">
            <path d="M2.35015 42.0522C9.35015 33.0522 31.3502 11.5522 41.3502 4.0522C51.3502 -3.4478 69.8502 1.5522 75.3502 12.0522M75.3502 12.0522L75.8502 2.0522M75.3502 12.0522L65.8502 11.5522" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
       </div>
      <button className="w-full bg-lime-300 text-gray-900 font-bold py-2.5 rounded-lg hover:bg-lime-400 transition-colors duration-200">
        Update
      </button>
    </div>
  );
};

interface SideBarProps {
    fullname: string,
    navigationChildren : ReactNode,
    footNavigationChild : ReactNode
}

export default function SideBar({fullname ,navigationChildren, footNavigationChild }:SideBarProps){
  return (
      <aside className="w-70 text-white min-h-screen font-sans bg-[#111111] p-4 flex flex-col justify-between">
        <div>
          {/* User Profile */}
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800 cursor-pointer">
            <div className="flex items-center">
               <Avatar className="w-10 h-10">
                    <AvatarImage className='rounded-full' src="https://github.com/shadcn.png" alt="@shannons" />
                    <AvatarFallback>{fullname[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <h1 className="font-bold text-white">{fullname}</h1>
                <h2 className="text-sm text-gray-400">@{fullname}</h2>
              </div>
            </div>
            <div className="flex items-center">
              <span className="bg-yellow-400 text-gray-900 text-[8px] font-bold px-2 py-0.5 rounded-full mr-3">USER</span>
            </div>
          </div>


          {/* Navigation */}
          <nav className="space-y-2 mt-5">
            {navigationChildren}
          </nav>

          <hr className="border-gray-700 my-6" />

          {/* Update Card */}
          <UpdateCard />
        </div>

        {/* Footer Navigation */}
        <div className="space-y-2">
          {footNavigationChild}
        </div>
      </aside>
  );
}