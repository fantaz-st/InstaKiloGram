import React from 'react';

import useFirestore from '../hook/useFirestore';

//framer motion import fix
import { motion } from 'framer-motion/dist/framer-motion';

const ImageGrid = ({ setSelectedImg }) => {
  const { docs } = useFirestore('images');

  // console.log(docs);
  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <motion.div layout whileHover={{ opacity: 1 }} className="img-wrap" key={doc.id} onClick={() => setSelectedImg(doc.url)}>
            <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} src={doc.url} alt="gallery" />
          </motion.div>
        ))}
    </div>
  );
};

export default ImageGrid;
