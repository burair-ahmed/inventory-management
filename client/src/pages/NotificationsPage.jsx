import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/api/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleViewDetails = (clientId) => {
    navigate(`/clients/edit/${clientId}`);
  };

  const handleMarkAsSeen = async (clientId) => {
    try {
      await axios.patch(`/api/notifications/${clientId}`, { notified: true });
      setNotifications(notifications.filter(notification => notification._id !== clientId));
    } catch (error) {
      console.error("Error marking notification as seen:", error);
    }
  };

  return (
    <div className="notifications-container">
      <h1 className="notifications-title">Client Notifications</h1>
      {notifications.length > 0 ? (
        <ul className="notifications-list">
          {notifications.map((notification, index) => (
            <li key={notification._id} className="notification-item">
              <div className="notification-details">
                <h3 className="notification-name">
                  {index + 1}. {notification.name}
                </h3>
                <p className="notification-date">
                  Due on: {new Date(notification.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className="notification-actions">
                <button 
                  onClick={() => handleViewDetails(notification._id)} 
                  className="notification-action-button"
                >
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-notifications">No notifications available</p>
      )}
    </div>
  );
};

export default NotificationsPage;
