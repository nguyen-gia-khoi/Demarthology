import { useState, useEffect, useRef } from "react";
import {
  mockNotifications,
  getNotificationsWithPagination,
  hasMoreNotifications,
  getTotalNotificationsCount,
} from "../data";
import { Notification } from "../models/Notification";
import { useNotification } from "./NotificationController";

function useNotificationController() {
  const { handleNotificationClick, showModal } = useNotification();
  const [openNotifications, setOpenNotifications] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Check if there are unread notifications from all data
  const hasUnreadNotifications = mockNotifications.some(n => !n.read);

  // Load notifications with lazy loading
  const loadNotifications = async (pageNum: number = 1) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const newNotifications = getNotificationsWithPagination(pageNum, 5);
    if (pageNum === 1) {
      setNotifications(newNotifications);
    } else {
      setNotifications(prev => [...prev, ...newNotifications]);
    }

    const hasMore = hasMoreNotifications(pageNum, 5);
    setHasMore(hasMore);
    setPage(pageNum);
    setLoading(false);
  };

  // Handle scroll for lazy loading
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading && hasMore) {
      loadNotifications(page + 1);
    }
  };

  // Load initial notifications when panel opens
  useEffect(() => {
    if (openNotifications && notifications.length === 0) {
      loadNotifications(1);
    }
  }, [openNotifications, notifications.length]);

  // Handle notification close with animation
  const handleCloseNotifications = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpenNotifications(false);
      setIsClosing(false);
      setNotifications([]);
      setHasMore(true);
      setPage(1);
      setShowAll(false);
    }, 300);
  };

  // Handle notification click
  const handleNotificationClickLocal = (notification: Notification, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!notification.read) {
      setNotifications(prev =>
        prev.map(n => (n.id === notification.id ? { ...n, read: true } : n))
      );
      const idx = mockNotifications.findIndex(n => n.id === notification.id);
      if (idx !== -1) mockNotifications[idx].read = true;
    }
    handleNotificationClick(notification);
  };

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showModal) return;
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        handleCloseNotifications();
      }
    };
    if (openNotifications) document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openNotifications, showModal]);

  return {
    // state
    openNotifications,
    isClosing,
    notifications,
    loading,
    hasMore,
    page,
    showAll,
    hasUnreadNotifications,
    notificationRef,

    // handlers
    setOpenNotifications,
    loadNotifications,
    handleScroll,
    handleCloseNotifications,
    handleNotificationClickLocal,
    setNotifications,
    setHasMore,
    setPage,
    setShowAll,
    getTotalNotificationsCount,
    mockNotifications
  };
}

export default useNotificationController;
