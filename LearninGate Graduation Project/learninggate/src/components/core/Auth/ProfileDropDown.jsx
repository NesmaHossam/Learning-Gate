import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../services/operations/authAPI"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm" style={{ color: '#E5E7EB' }} />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            top: '118%',
            right: '0',
            zIndex: 1000,
            border: '1px solid #374151',
            backgroundColor: '#1F2937',
            borderRadius: '0.375rem',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
          ref={ref}
        >
          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '10px 12px',
              fontSize: '0.875rem',
              color: '#E5E7EB',
              backgroundColor: '#1F2937',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#374151')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#1F2937')}
          >
            <VscSignOut className="text-lg" style={{ color: '#E5E7EB' }} />
            Logout
          </div>
        </div>
      )}
    </button>
  );
}