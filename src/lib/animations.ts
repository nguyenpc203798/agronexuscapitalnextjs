/**
 * Khai báo các animation variants cho framer-motion
 * Được tạo để tái sử dụng trong toàn bộ ứng dụng
 */

/**
 * Hiệu ứng fade in từ dưới lên
 */
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

/**
 * Hiệu ứng fade in từ trên xuống
 */
export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

/**
 * Hiệu ứng fade in từ trái sang
 */
export const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

/**
 * Hiệu ứng fade in từ phải sang
 */
export const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

/**
 * Hiệu ứng scale lên từ nhỏ đến lớn
 */
export const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5
    }
  }
};

/**
 * Hiệu ứng stagger children để tạo hiệu ứng cho các phần tử con
 * theo thứ tự thời gian
 */
export const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

/**
 * Hiệu ứng stagger children nhanh hơn
 */
export const staggerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

/**
 * Hiệu ứng stagger children chậm hơn
 */
export const staggerSlow = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

export const staggerGrid = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

/**
 * Hiệu ứng chỉ fade in đơn giản
 */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.6
    }
  }
};

/**
 * Phương thức tạo variant với các tham số tùy chỉnh
 */
export const createFadeInUpVariant = (y = 20, duration = 0.6) => ({
  hidden: { opacity: 0, y },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration, ease: 'easeOut' }
  }
});

// Hiệu ứng staggered children (sử dụng cho danh sách các item)
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Hiệu ứng cho từng item trong staggered container
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4
    }
  }
}; 