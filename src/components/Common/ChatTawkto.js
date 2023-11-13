"use client"
import React, { useEffect } from 'react'

function ChatTawkto({url}) {
  useEffect(() => {
    // Tawk API script
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();

    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = url;
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <div className='fixed !z-[999]'>
    </div>
  );
};

export default ChatTawkto