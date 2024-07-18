import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

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

  return (
    <div className="notifications-container">
      <h1 className="notifications-title">Client Notifications</h1>
      {notifications.length > 0 ? (
        <ul className="notifications-list">
          {notifications.map((notification) => (
            <li key={notification._id} className="notification-item">
              <div className="notification-details">
                <h3 className="notification-name">{notification.name}</h3>
                <p className="notification-date">
                  Due on: {new Date(notification.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className="notification-actions">
                <Link to={`/clients`} className="notification-action-link">
                  View Details
                </Link>
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
