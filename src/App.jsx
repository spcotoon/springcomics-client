import "./App.css";

import { Route, Routes, useLocation } from "react-router-dom";
import ComicApproval from "./components/artist/ComicApproval";
import ArtistSignup from "./components/admin/artistManage/ArtistSignup";
import ArtistLogin from "./components/artist/ArtistLogin";
import ComicUpload from "./components/artist/ComicUpload";
import ArtistMyPage from "./components/artist/ArtistMyPage";
import ArtistNav from "./components/nav/ArtistNav";
import UserNav from "./components/nav/UserNav";
import Login from "./components/user/Login";
import Signup from "./components/user/Signup";
import ArtistComicHeadList from "./components/artist/comic/ArtistComicHeadList";
import ArtistComicBodyList from "./components/artist/comic/ArtistComicBodyList";
import ArtistComicOneDetail from "./components/artist/comic/ArtistComicBodyOneDetail";
import AllComicList from "./components/user/comic/AllComicList";
import OneComicList from "./components/user/comic/OneComicList";
import RequireArtistAuth from "./components/auth/RequireAritstAuth";
import ComicListByArtist from "./components/user/comic/ComicListByArtist";
import OneComicDetail from "./components/user/comic/OneComicView/OneComicDetail";
import RequireUserAuth from "./components/auth/RequireUserAuth";
import AdminLogin from "./components/admin/AdminLogin";
import AdminMain from "./components/admin/AdminMain";
import AdminNav from "./components/admin/AdminNav";
import AdminMemberList from "./components/admin/memberManage/AdminMemberList";
import AdminArtistList from "./components/admin/artistManage/AdminArtistList";
import ComicforCommentList from "./components/admin/commentManage/ComicforCommentList";
import ComicBodyForCommentList from "./components/admin/commentManage/ComicBodyForCommentList";
import AdminCommentList from "./components/admin/commentManage/AdminCommentList";
import PfComicList from "./components/admin/adminComic/PfComicList";
import PfComicHeadList from "./components/admin/adminComic/PfComicHeadList";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname.startsWith("/artist/") ? (
        <ArtistNav />
      ) : location.pathname.startsWith("/sca/") ? (
        <AdminNav />
      ) : (
        <UserNav />
      )}

      <Routes>
        <Route path="/" element={<AllComicList />} />
        <Route path="/comics" element={<AllComicList />} />
        <Route path="/comics/:headId" element={<OneComicList />} />
        <Route
          path="/comics/artist/:artistName"
          element={<ComicListByArtist />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<RequireUserAuth />}>
          <Route path="/comics/:headId/:no" element={<OneComicDetail />} />
        </Route>
        <Route path="/comics/portfolio" element={<PfComicList />} />

        <Route path="/artist/login" element={<ArtistLogin />} />
        <Route element={<RequireArtistAuth />}>
          <Route path="/artist" element={<ArtistComicHeadList />} />
          <Route path="/artist/list" element={<ArtistComicHeadList />} />
          <Route path="/artist/approval" element={<ComicApproval />} />
          <Route path="/artist/upload" element={<ComicUpload />} />
          <Route path="/artist/my-page" element={<ArtistMyPage />} />
          <Route path="/artist/:id" element={<ArtistComicBodyList />} />
          <Route
            path="/artist/content/:id"
            element={<ArtistComicOneDetail />}
          />
        </Route>

        <Route path="/sca/login" element={<AdminLogin />} />
        <Route path="/sca/main" element={<AdminMain />} />
        <Route path="/sca/member" element={<AdminMemberList />} />
        <Route path="/sca/comment" element={<ComicforCommentList />} />
        <Route
          path="/sca/comment/comic"
          element={<ComicBodyForCommentList />}
        />
        <Route path="/sca/comment/list" element={<AdminCommentList />} />
        <Route path="/sca/artist" element={<AdminArtistList />} />
        <Route path="/sca/artist/signup" element={<ArtistSignup />} />
        <Route path="/sca/comics" element={<PfComicHeadList />} />

        <Route path="*" element={<AllComicList />} />
        <Route path="/artist/*" element={<ArtistComicHeadList />} />
        <Route path="/sca/*" element={<AdminMain />} />
      </Routes>
    </div>
  );
}

export default App;
