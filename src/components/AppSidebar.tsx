import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import { 
  BarChart, 
  Shield, 
  ShieldAlert, 
  Grid3X3, 
  Link2,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AppSidebar() {
  const location = useLocation();
  const { open, toggleSidebar } = useSidebar();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar variant="inset" className="border-r border-gray-200 bg-white" collapsible="icon">
      <SidebarHeader className="border-b border-gray-200">
        <div className="flex items-center justify-between px-2 py-3">
          {/* <div className="flex items-center">
            <Shield className="h-5 w-5 text-cloud-blue mr-2" />
            {open && <h3 className="font-semibold text-lg text-gray-800">Sentinel AI</h3>}
          </div> */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="h-7 w-7"
          >
            {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </Button>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{open ? "Navigation" : ""}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/")} tooltip="Dashboard">
                  <Link to="/">
                    <BarChart className="h-5 w-5" />
                    {open && <span>Dashboard</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/resource-graph")} tooltip="Resource Graph">
                  <Link to="/resource-graph">
                    <Grid3X3 className="h-5 w-5" />
                    {open && <span>Resource Graph</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/risks")} tooltip="Vulnerabilities">
                  <Link to="/risks">
                    <ShieldAlert className="h-5 w-5" />
                    {open && <span>Vulnerabilities</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/access")} tooltip="Access Paths">
                  <Link to="/access">
                    <Link2 className="h-5 w-5" />
                    {open && <span>Access Paths</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      {/* <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link to="/settings">
                <Settings className="h-5 w-5" />
                {open && <span>Settings</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter> */}
    </Sidebar>
  );
}
