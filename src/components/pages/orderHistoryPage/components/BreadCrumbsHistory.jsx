import React from 'react'
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BreadCrumbsHistory = () => {
  const { t } = useTranslation();
  return (
    <div className="bread-crumbs">
      <div className="container bread-crumbs__flexbox">
        <Link className="bread-crumbs__item" to="/">
          { t('historyPage.breadcrumbs.home')}
        </Link>
        <Link className="bread-crumbs__item" to={'/gallery'}>
          { t('historyPage.breadcrumbs.gallery')}
        </Link>
        <a className="bread-crumbs__item" href='#'>{ t('historyPage.breadcrumbs.profile')}</a>
      </div>
    </div>
  )
}

export default BreadCrumbsHistory