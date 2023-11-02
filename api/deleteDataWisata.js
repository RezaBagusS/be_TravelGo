const { verifyToken } = require("../handlers/jwt");
const supabase = require("../database/initDB");

const deleteDataWisata = async (req, res) => {

    try {
        
        const { token, id } = req.body;

        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({
                status: "error",
                message: "Token tidak valid",
            });
        }

        const { error } = await supabase
            .from("DataWisata")
            .delete()
            .eq("id", id);

        if (error) {
            return res.status(500).json({
                status: "error",
                message: "Error saat menghapus data wisata",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Berhasil menghapus data wisata",
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Server Error",
        });
    }

}

module.exports = deleteDataWisata;