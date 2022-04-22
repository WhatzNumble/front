import AdminLayout from "components/Admin/AdminLayout";

function Contents(){
    return (
        <AdminLayout title="콘텐츠">
            <div className="Contents">
                콘텐츠 페이지
                
                <style jsx>{`
                    .Contents {
                        padding: 10px;
                    }
                `}</style>
            </div>
        </AdminLayout>
    );
}

export default Contents;