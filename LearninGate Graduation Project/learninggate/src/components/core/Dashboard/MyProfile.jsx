import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { formattedDate } from "../../../utils/dateFormatter";
import IconBtn from "../../common/IconBtn";

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <>
      <h1
        style={{
          marginBottom: "3.5rem",
          fontSize: "1.875rem",
          fontWeight: "500",
        }}
        className="text-lg font-semibold text-richblack-5"
      >
        My Profile
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "0.375rem",
          borderWidth: "1px",
          borderColor: "#374151",
          padding: "2rem 3rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            style={{
              aspectRatio: "1 / 1",
              width: "78px",
              borderRadius: "9999px",
              objectFit: "cover",
            }}
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
          >
            <p
              style={{ fontSize: "1.125rem", fontWeight: "600", color: "#000" }}
            >
              {user?.firstName + " " + user?.lastName}
            </p>
            <p style={{ fontSize: "0.875rem", color: "#717171" }}>
              {user?.email}
            </p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings");
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      <div
        style={{
          margin: "2.5rem 0",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
          borderRadius: "0.375rem",
          borderWidth: "1px",
          borderColor: "#374151",
          padding: "2rem 3rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              color: "#080474",
            }}
          >
            About
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          style={{
            fontSize: "0.875rem",
            fontWeight: "500",
            color: user?.additionalDetails?.about ? "#F3F4F6" : "#717171",
          }}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div
        style={{
          margin: "2.5rem 0",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
          borderRadius: "0.375rem",
          borderWidth: "1px",
          borderColor: "#374151",
          padding: "2rem 3rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              color: "#080474",
            }}
          >
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: "500px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <div>
              <p
                style={{
                  marginBottom: "0.5rem",
                  fontSize: "0.875rem",
                  color: "#2D2D2D",
                }}
              >
                First Name
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#B5B5B5",
                }}
              >
                {user?.firstName}
              </p>
            </div>
            <div>
              <p
                style={{
                  marginBottom: "0.5rem",
                  fontSize: "0.875rem",
                  color: "#2D2D2D",
                }}
              >
                Email
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#B5B5B5",
                }}
              >
                {user?.email}
              </p>
            </div>
            <div>
              <p
                style={{
                  marginBottom: "0.5rem",
                  fontSize: "0.875rem",
                  color: "#2D2D2D",
                }}
              >
                Gender
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#B5B5B5",
                }}
              >
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <div>
              <p
                style={{
                  marginBottom: "0.5rem",
                  fontSize: "0.875rem",
                  color: "#2D2D2D",
                }}
              >
                Last Name
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#B5B5B5",
                }}
              >
                {user?.lastName}
              </p>
            </div>
            <div>
              <p
                style={{
                  marginBottom: "0.5rem",
                  fontSize: "0.875rem",
                  color: "#2D2D2D",
                }}
              >
                Phone Number
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#B5B5B5",
                }}
              >
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p
                style={{
                  marginBottom: "0.5rem",
                  fontSize: "0.875rem",
                  color: "#2D2D2D",
                }}
              >
                Date Of Birth
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#B5B5B5",
                }}
              >
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
