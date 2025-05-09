import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const AddressPortal = ({ children }) => {

    const [ mounted, setMounted ] = useState(false);

    useEffect(() => {

        setMounted(true);
        return () => setMounted(false);

    }, []);

    const portalRoot = mounted ? document.getElementById('portal-root') : null;

    if (!portalRoot) {
        return null;
    }

    return createPortal(children, portalRoot);
};

export default AddressPortal;